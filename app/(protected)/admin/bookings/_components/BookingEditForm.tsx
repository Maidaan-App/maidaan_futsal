"use client";
import { bookingStatusTypes, MINIOURL, poppins } from "@/lib/constants";
import { useAdminAddUpdateBookingsMutation } from "@/store/api/Admin/adminBookings";
import { Plus, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BOOKING, PLAYER } from "@/lib/types";
import { MenuItem, Select } from "@mui/material";
import { paths } from "@/lib/paths";
import { TextField } from "@mui/material";
import { toast } from "sonner";

type Item = {
  name: string;
  quantity: number;
  price: number;
  total?: number;
};

const itemSchema = z.object({
  name: z.string().min(1, "Item Name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(1, "Price must be greater than 0"),
});

const formSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  phone: z.string().min(1, "Contact is required"),
  status: z.string().min(1, "Booking Status is required"),
  remarks: z.string().optional(),
  itemPurchased: z.array(itemSchema).optional(),
});

interface props {
  ExistingDetail: BOOKING;
  playerLists: PLAYER[];
}

const BookingEditForm = ({ ExistingDetail, playerLists }: props) => {
  const matchedPlayer = playerLists.find(
    (player) => player._id === ExistingDetail.playerId
  );
  const [selectedPlayer, setSelectedPlayer] = useState<PLAYER | null>(
    matchedPlayer || null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const [discount, setDiscount] = useState(
    parseInt(ExistingDetail.discount) || 0
  );
  const [items, setItems] = useState<Item[]>(
    ExistingDetail.itemPurchased || []
  );
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      status: ExistingDetail.status ?? bookingStatusTypes[0],
      remarks: ExistingDetail.remarks ?? "",
      itemPurchased: items,
    },
  });

  useEffect(() => {
    if (selectedPlayer) {
      form.reset({
        name: selectedPlayer.name,
        phone: selectedPlayer.phone,
      });
    }
  }, [selectedPlayer]);

  const filteredPlayers = playerLists.filter((player) =>
    player.phone.toString().includes(searchTerm)
  );

  const handleSelectPlayer = (player: PLAYER) => {
    setSelectedPlayer(player);
    setSearchTerm("");
    setIsFocused(false);
  };

  const handleRemovePlayer = () => {
    form.setValue("name", "");
    setSelectedPlayer(null);
  };

  // Handle adding an item to the list
  const handleAddItem = () => {
    if (!itemName || !itemQuantity || !itemPrice) return;
    if (itemName && itemQuantity > 0 && itemPrice > 0) {
      const newItem: Item = {
        name: itemName,
        quantity: itemQuantity,
        price: itemPrice,
        total: itemQuantity * itemPrice,
      };
      setItems([...items, newItem]);
      setItemName("");
      setItemQuantity(0);
      setItemPrice(0);
      form.setValue("itemPurchased", [...items, newItem]); // Update form value
    }
  };

  // Handle deleting an item from the list
  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    form.setValue("itemPurchased", updatedItems); // Update form value
  };

  const calculateTotals = () => {
    const slotTotal = parseInt(ExistingDetail.slotsTotal);
    const itemsTotal = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const subtotal = slotTotal + itemsTotal;
    const netTotal = subtotal - discount;

    return { slotTotal, itemsTotal, subtotal, netTotal };
  };

  const { slotTotal, itemsTotal, subtotal, netTotal } = calculateTotals();
  const [AdminAddUpdateBooking] = useAdminAddUpdateBookingsMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const total = calculateTotals();
      const formData = {
        _id: ExistingDetail._id,
        ...values,
        playerId: selectedPlayer?._id,
        linkedCourtId: ExistingDetail.linkedCourtId,
        discount,
        netTotal: total.netTotal,
      };

      const response = await AdminAddUpdateBooking({
        ...formData,
      }).unwrap();
      if (response) {
        toast.success(response.message);
        setLoading(false);
        router.push(paths.admin.bookings);
      } else {
        toast.error(`Something Went Wrong`);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-5 ${poppins.className}`}>
      <h1 className="text-[1.5rem] mb-4 font-medium">Edit Booking</h1>

      <div className="flex flex-col lg:flex-row rounded-xl border w-full">
        {/* Left Side - Date & Slots */}
        <div className="p-5 lg:w-1/3 bg-[#FBFBFB]">
          {ExistingDetail.selectedDate && (
            <div>
              <p className="text-[1rem] font-medium mb-4">Selected Date</p>
              <p className="text-lg font-semibold border-[1px] border-primary h-[8.875rem] w-[8.125rem] my-5 rounded-xl flex  flex-col  gap-3 items-center justify-center">
                <span className="text-[1rem] font-normal">
                  {new Date(ExistingDetail.selectedDate)
                    .toLocaleDateString("en-US", { weekday: "short" })
                    .toUpperCase()}
                </span>
                <span className="text-[1.625rem] font-semibold">
                  {new Date(ExistingDetail.selectedDate).getDate()}
                </span>
                <span className="text-[1rem] font-normal">
                  {new Date(ExistingDetail.selectedDate)
                    .toLocaleDateString("en-US", { month: "short" })
                    .toUpperCase()}
                </span>
              </p>
            </div>
          )}
          {ExistingDetail.selectedslots &&
            ExistingDetail.selectedslots.length > 0 && (
              <div>
                <p className="text-[1rem] font-medium mb-4">Selected Slot(s)</p>
                <ul className="space-y-5">
                  {ExistingDetail.selectedslots.map(
                    (slot: any, index: number) => (
                      <li
                        key={index}
                        className="text-lg font-semibold border-[1px] border-primary w-[16.688rem] h-[4.375rem] rounded-xl flex items-center justify-center"
                      >
                        {slot}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
        </div>

        {/* Right Side - Player Form */}
        <div className="lg:w-2/3 mx-auto p-10  bg-white">
          <h2 className="text-[1rem] font-medium text-[#28353D] mb-4">
            Player Details
          </h2>
          {selectedPlayer && (
            <div className="bg-white p-4 rounded-md  flex justify-between shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] relative">
              <div className="flex items-center">
                {selectedPlayer.image ? (
                  <img
                    src={`${MINIOURL}${selectedPlayer?.image}`}
                    alt={selectedPlayer.name}
                    className="w-[5.875rem] h-[5.875rem] rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full flex justify-center items-center bg-primary text-3xl text-white mr-4">
                    {" "}
                    {selectedPlayer.name[0]}
                  </div>
                )}

                <div>
                  <h3 className="text-[1.125rem] font-medium mb-3">
                    {selectedPlayer.name}
                  </h3>
                  {selectedPlayer.address && (
                    <p className="font-normal text-[#8A92A6] text-[0.75rem]">
                      {selectedPlayer.address}
                    </p>
                  )}
                  <p className="text-primary font-normal text-[0.75rem]">
                    {selectedPlayer.phone}
                  </p>
                </div>
              </div>
              {ExistingDetail.status === "Reserved" && (
                <button
                  className="text-red-500 font-bold absolute top-5 right-5"
                  onClick={handleRemovePlayer}
                >
                  <X />
                </button>
              )}
            </div>
          )}

          <Form {...form}>
            <form
              className="mt-4 w-full space-y-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {!selectedPlayer && (
                <>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Phone Number"
                            className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 h-[3.25rem]"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() =>
                              setTimeout(() => setIsFocused(false), 200)
                            }
                            value={searchTerm}
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                              form.setValue("phone", e.target.value);
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {isFocused && (
                    <div className="mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {filteredPlayers.length > 0 ? (
                        filteredPlayers.map((player) => (
                          <div
                            key={player._id}
                            className="flex items-center p-2 hover:bg-green-50 cursor-pointer hover:border-l-4 hover:border-green-500"
                            onClick={() => handleSelectPlayer(player)}
                          >
                            {player.image ? (
                              <img
                                src={`${MINIOURL}${player.image}`}
                                alt={player.name}
                                className="w-8 h-8 rounded-full mr-2 object-cover"
                              />
                            ) : (
                              <div className="h-8 w-8 mr-2 rounded-full flex justify-center items-center bg-primary text-3xl text-white p-1">
                                {player.name[0]}
                              </div>
                            )}

                            <span>{player.name}</span>
                          </div>
                        ))
                      ) : (
                        <div className="p-2 text-gray-500">
                          No players found
                        </div>
                      )}
                    </div>
                  )}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextField
                            id="outlined-basic"
                            label="Full Name"
                            variant="outlined"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <div className="flex flex-col lg:flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="lg:w-1/2">
                      <FormControl>
                        <Select {...field} displayEmpty className="w-full">
                          <MenuItem value="" disabled>
                            Booking Status
                          </MenuItem>
                          {bookingStatusTypes.map((status, index) => (
                            <MenuItem key={index} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem className="lg:w-1/2">
                      <FormControl>
                        <TextField
                          id="outlined-basic"
                          label="Remarks"
                          variant="outlined"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Add Items Section */}
              <div className=" space-y-6">
                {/* Add Items Section */}
                <h2 className="text-lg font-medium">Items Purchased</h2>
                <div className="flex gap-4">
                  <TextField
                    label="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Quantity"
                    type="number"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(parseInt(e.target.value))}
                    fullWidth
                  />
                  <TextField
                    label="Price"
                    type="number"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(parseFloat(e.target.value))}
                    fullWidth
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="border-2 border-primary text-primary px-4 py-2 rounded-lg flex items-center gap-3"
                >
                  <div className="border-2 border-primary rounded-md ">
                    <Plus />
                  </div>
                  Add Item
                </button>

                {/* Items List */}
                {items.length > 0 && (
                  <table className="w-full mt-4">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Item Name</th>
                        <th className="text-left p-2">Quantity</th>
                        <th className="text-left p-2">Price</th>
                        <th className="text-left p-2">Total</th>
                        <th className="text-left p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{item.name}</td>
                          <td className="p-2">{item.quantity}</td>
                          <td className="p-2">Rs. {item.price}</td>
                          <td className="p-2">
                            Rs. {item.quantity * item.price}
                          </td>
                          <td className="p-2">
                            <button
                              type="button"
                              onClick={() => handleDeleteItem(index)}
                              className="text-red-500 hover:underline flex items-center"
                            >
                              <Trash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Totals Section */}
                <div className="space-y-2 mt-4 text-right">
                  <div className="flex justify-between">
                    <span>Slot&apos;s Total:</span>
                    <span>Rs. {slotTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Item&apos;s Total:</span>
                    <span>Rs. {itemsTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Discount:</span>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => {
                        let value = parseInt(e.target.value) || 0;
                        if (value < 0) {
                          value = -value; // Make the value negative if it's positive
                        }
                        setDiscount(value);
                      }}
                      className="border rounded p-1 w-20 text-right"
                    />
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Net Total:</span>
                    <span className="text-green-500">Rs. {netTotal}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-5">
                <button
                  type="button"
                  disabled={Loading}
                  onClick={() => router.push(paths.admin.bookings)}
                  className="bg-white text-green-500 px-4 py-2 rounded-md  border"
                >
                  Cancel
                </button>
                <button
                  disabled={Loading}
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BookingEditForm;
