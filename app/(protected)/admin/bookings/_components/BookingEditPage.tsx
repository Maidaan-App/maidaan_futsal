"use client";
import { bookingStatusTypes, MINIOURL, poppins } from "@/lib/constants";
import { useGetAdminBookingByIdQuery } from "@/store/api/Admin/adminBookings";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
import { PLAYER } from "@/lib/types";
import { useGetAllAdminPlayersQuery } from "@/store/api/Admin/adminPlayers";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { paths } from "@/lib/paths";
import Loader from "@/components/Loader";

const formSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  phone: z.string().min(1, "Contact is required"),
  bookingStatus: z.string().min(1, "Booking Status is required"),
  remarks: z.string().optional(),
});

const BookingEditPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const [selectedPlayer, setSelectedPlayer] = useState(true);
  const [playerLists, setPlayerLists] = useState<PLAYER[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminBookingByIdQuery(id);
  const { data: PlayersData, isLoading: PlayersDataLoading } =
    useGetAllAdminPlayersQuery("");
  console.log("ExistingDetail:", ExistingDetail);

  useEffect(() => {
    if (PlayersData && PlayersData.length > 0) {
      setPlayerLists(PlayersData);
    }
  }, [PlayersData]);

  useEffect(() => {
    if (ExistingDetail) {
      form.reset({
        name: ExistingDetail.name,
        phone: ExistingDetail.phone,
        bookingStatus: ExistingDetail.status,
        remarks: ExistingDetail.remarks ?? "",
      });
    }
  }, [ExistingDetail]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      bookingStatus: bookingStatusTypes[0],
      remarks: "",
    },
  });

  const filteredPlayers = playerLists.filter((player) =>
    player.phone.toString().includes(searchTerm)
  );

  const handleSelectPlayer = (player: PLAYER) => {
    setSelectedPlayer(true);
    setSearchTerm("");
    setIsFocused(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values:", values);
    // try {
    //   setLoading(true);
    //   const formData = {
    //     ...values,
    //     playerId: selectedPlayer?._id,
    //     linkedCourtId: selectedCourt._id,
    //     selectedDate,
    //     selectedslots: selectedTimeSlots,
    //   };
    //   const response = await AdminAddUpdateBooking({
    //     ...formData,
    //   }).unwrap();
    //   if (response) {
    //     toast.success(response.message);
    //     setLoading(false);
    //     router.push(paths.admin.bookings);
    //   } else {
    //     toast.error(`Something Went Wrong`);
    //     setLoading(false);
    //   }
    // } catch (error: any) {
    //   toast.error(error.data.message);
    //   setLoading(false);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleRemovePlayer = () => {
    form.setValue("name", "");
    setSelectedPlayer(false);
  };

  return (
    <>
      {Loading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
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
                    <p className="text-[1rem] font-medium mb-4">
                      Selected Slot(s)
                    </p>
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
              {ExistingDetail && selectedPlayer && (
                <div className="bg-white p-4 rounded-md  flex justify-between shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] relative">
                  <div className="flex items-center">
                    <img
                      src={`${MINIOURL}${ExistingDetail?.image}`}
                      alt={ExistingDetail.name}
                      className="w-[5.875rem] h-[5.875rem] rounded-full mr-4 "
                    />
                    <div>
                      <h3 className="text-[1.125rem] font-medium mb-3">
                        {ExistingDetail.name}
                      </h3>
                      {ExistingDetail.address && (
                        <p className="font-normal text-[#8A92A6] text-[0.75rem]">
                          {ExistingDetail.address}
                        </p>
                      )}
                      <p className="text-primary font-normal text-[0.75rem]">
                        {ExistingDetail.phone}
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
                                <img
                                  src={`${MINIOURL}${player.image}`}
                                  alt={player.name}
                                  className="w-8 h-8 rounded-full mr-2"
                                />
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
                      name="bookingStatus"
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
              <button
                disabled={Loading}
                onClick={() => router.push(paths.admin.bookings)}
                className="bg-white text-green-500 px-4 py-2 rounded-md mt-4 border"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingEditPage;
