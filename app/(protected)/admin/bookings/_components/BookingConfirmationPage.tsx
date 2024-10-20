"use client";

import { poppins } from "@/app/lib/constants";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useGetAllAdminPlayersQuery } from "@/store/api/Admin/adminPlayers";
import { PLAYER } from "@/lib/types";
import { bookingStatusTypes, MINIOURL } from "@/lib/constants";
import { toast } from "sonner";
import { paths } from "@/lib/paths";
import { useRouter } from "next/navigation";
import { useAdminAddUpdateBookingsMutation } from "@/store/api/Admin/adminBookings";

const formSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Contact is required"),
  address: z.string().min(1, "Address is required"),
  bookingStatus: z.string().min(1, "Booking Status is required"),
  remarks: z.string().optional(),
});

const BookingConfirmationPage = ({
  setcompleteBooking,
  selectedDate,
  selectedTimeSlots,
  selectedCourt,
}: any) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PLAYER | null>(null); // Selected player state
  const [playerLists, setPlayerLists] = useState<PLAYER[]>([]);
  const [Loading, setLoading] = useState(false);
  const { data: PlayersData, isLoading: PlayersDataLoading } =
    useGetAllAdminPlayersQuery("");
  const router = useRouter();
  const [AdminAddUpdateBooking] = useAdminAddUpdateBookingsMutation();

  useEffect(() => {
    if (PlayersData && PlayersData.length > 0) {
      setPlayerLists(PlayersData);
    }
  }, [PlayersData]);

  useEffect(() => {
    if (selectedPlayer) {
      form.reset({
        name: selectedPlayer.name,
        email: selectedPlayer.email,
        phone: selectedPlayer.phone,
        address: selectedPlayer.address,
      });
    }
  }, [selectedPlayer]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      bookingStatus: bookingStatusTypes[0],
      remarks: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const formData = {
        ...values,
        playerId: selectedPlayer?._id,
        linkedCourtId: selectedCourt._id,
        selectedDate,
        selectedslots: selectedTimeSlots,
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

  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredPlayers = playerLists.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPlayer = (player: PLAYER) => {
    setSelectedPlayer(player);
    setSearchTerm("");
    setIsFocused(false);
  };

  const handleRemovePlayer = () => {
    setSelectedPlayer(null);
  };
  return (
    <div className={`p-5 ${poppins.className}`}>
      <h1 className="text-[1.5rem] mb-4 font-medium">
        Creating a booking in{" "}
        <span className="text-primary">{selectedCourt.name}</span>
      </h1>

      <div className="flex flex-col lg:flex-row rounded-xl border w-full">
        {/* Left Side - Date & Slots */}
        <div className="p-5 lg:w-1/3 bg-[#FBFBFB]">
          <div>
            <p className="text-[1rem] font-medium mb-4">Selected Date</p>
            <p className="text-lg font-semibold border-[1px] border-primary h-[8.875rem] w-[8.125rem] my-5 rounded-xl flex  flex-col  gap-3 items-center justify-center">
              <span className="text-[1rem] font-normal">
                {selectedDate
                  ?.toLocaleDateString("en-US", { weekday: "short" })
                  .toUpperCase()}
              </span>
              <span className="text-[1.625rem] font-semibold">
                {selectedDate?.getDate()}
              </span>
              <span className="text-[1rem] font-normal">
                {selectedDate
                  ?.toLocaleDateString("en-US", { month: "short" })
                  .toUpperCase()}
              </span>
            </p>
          </div>
          <div>
            <p className="text-[1rem] font-medium mb-4">Selected Slot(s)</p>
            <ul className="space-y-5">
              {selectedTimeSlots.map((slot: any, index: number) => (
                <li
                  key={index}
                  className="text-lg font-semibold border-[1px] border-primary w-[16.688rem] h-[4.375rem] rounded-xl flex items-center justify-center"
                >
                  {slot}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side - Player Form */}
        <div className="lg:w-2/3 mx-auto p-10  bg-white">
          <h2 className="text-[1rem] font-medium text-[#28353D] mb-4">
            {selectedPlayer ? "Player" : "For Existing Player "}
          </h2>

          {/* If Player Selected */}
          {selectedPlayer ? (
            <div className="bg-white p-4 rounded-md  flex justify-between shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] relative">
              <div className="flex items-center">
                <img
                  src={`${MINIOURL}${selectedPlayer.image}`}
                  alt={selectedPlayer.name}
                  className="w-[5.875rem] h-[5.875rem] rounded-full mr-4 "
                />
                <div>
                  <h3 className="text-[1.125rem] font-medium mb-3">
                    {selectedPlayer.name}
                  </h3>
                  <p className="font-normal text-[#8A92A6] text-[0.75rem]">
                    {selectedPlayer.address}
                  </p>
                  <p className="text-primary font-normal text-[0.75rem]">
                    {selectedPlayer.phone}
                  </p>
                </div>
              </div>
              <button
                className="text-red-500 font-bold absolute top-5 right-5"
                onClick={handleRemovePlayer}
              >
                <X />
              </button>
            </div>
          ) : (
            <>
              <Input
                type="text"
                placeholder="Search for existing player"
                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 h-[3.25rem]"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)} // handle delay in blur
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                        <img
                          src={`${MINIOURL}${player.image}`}
                          alt={player.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span>{player.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">No players found</div>
                  )}
                </div>
              )}

              {/* Form for New Player */}
              <Form {...form}>
                <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                  <h2 className="text-[1rem] font-medium text-[#28353D] mb-4">
                    For New Player
                  </h2>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Full Name"
                            {...field}
                            className="border rounded-md w-full p-2 mb-2"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Email Address"
                            {...field}
                            className="border rounded-md w-full p-2 mb-2"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Contact"
                            {...field}
                            className="border rounded-md w-full p-2 mb-2"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Address"
                            {...field}
                            className="border rounded-md w-full p-2 mb-2"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col lg:flex-row gap-2 w-full">
                    {/* Booking Status */}

                    <FormField
                      control={form.control}
                      name="bookingStatus"
                      render={({ field }) => (
                        <FormItem className="lg:w-1/2">
                          <FormLabel>Booking Status</FormLabel>

                          <FormControl>
                            <select
                              {...field}
                              className="border border-gray-300 p-3 w-full rounded-md bg-white text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 appearance-none"
                            >
                              {bookingStatusTypes.map((item, index) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
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
                          <FormLabel>Remarks</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Remarks"
                              {...field}
                              className="border rounded-md w-full p-2 mb-2"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* <div className="flex space-x-4"></div> */}

                  <div className="flex justify-end mb-4 mt-3 gap-2 ">
                    <span>Slot&apos;s Total:</span>
                    <span>Rs. 2000</span>
                  </div>
                  <div className="flex justify-end font-bold mb-4 gap-2">
                    <span>Total:</span>
                    <span className="text-green-500">Rs. 2000</span>
                  </div>
                  <div className="flex justify-end">
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
            </>
          )}

          {/* Additional Details Section */}
          {selectedPlayer && (
            <Form {...form}>
              <form
                className="mt-4 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex flex-col lg:flex-row gap-2 w-full">
                  <FormField
                    control={form.control}
                    name="bookingStatus"
                    render={({ field }) => (
                      <FormItem className="lg:w-1/2">
                        <FormLabel>Booking Status</FormLabel>

                        <FormControl>
                          <select
                            {...field}
                            className="border border-gray-300 p-3 w-full rounded-md bg-white text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 appearance-none"
                          >
                            {bookingStatusTypes.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
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
                        <FormLabel>Remarks</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Remarks"
                            {...field}
                            className="border rounded-md w-full p-2 mb-2"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end mb-4 mt-3 gap-2 ">
                  <span>Slot&apos;s Total:</span>
                  <span>Rs. 2000</span>
                </div>
                <div className="flex justify-end font-bold mb-4 gap-2">
                  <span>Total:</span>
                  <span className="text-green-500">Rs. 2000</span>
                </div>
                <div className="flex justify-end">
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
          )}
          <button
            disabled={Loading}
            onClick={() => setcompleteBooking(false)}
            className="bg-white text-green-500 px-4 py-2 rounded-md mt-4 border"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;