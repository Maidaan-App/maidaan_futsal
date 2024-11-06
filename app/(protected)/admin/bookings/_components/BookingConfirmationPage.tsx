"use client";

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
import { bookingStatusTypes, MINIOURL, poppins } from "@/lib/constants";
import { toast } from "sonner";
import { paths } from "@/lib/paths";
import { useRouter } from "next/navigation";
import { useAdminAddUpdateBookingsMutation } from "@/store/api/Admin/adminBookings";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";

const formSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  phone: z.string().min(1, "Contact is required"),
  bookingStatus: z.string().min(1, "Booking Status is required"),
  remarks: z.string().optional(),
});

const calculateTotalPrice = (
  selectedCourt: any,
  selectedTimeSlots: string[],
  selectedDate: Date
) => {
  // Check if the selected date is a Saturday (holiday)
  const isHoliday = selectedDate.getDay() === 6;

  // Helper function to parse time strings of either "HH:MM AM/PM" or ISO format
  const parseTime = (time: string) => {
    // Check if the time is in "HH:MM AM/PM" format
    const timeMatch = time.match(/(\d+):(\d+) (AM|PM)/);
    if (timeMatch) {
      const [, hours, minutes, period] = timeMatch;
      const hours24 =
        period === "PM" && parseInt(hours) < 12
          ? parseInt(hours) + 12
          : period === "AM" && parseInt(hours) === 12
          ? 0
          : parseInt(hours);
      return { hours: hours24, minutes: parseInt(minutes) };
    }

    // Check if the time is in ISO format
    const date = new Date(time);
    if (!isNaN(date.getTime())) {
      return { hours: date.getHours(), minutes: date.getMinutes() };
    }

    throw new Error(`Invalid time format: ${time}`);
  };

  // Helper function to check if time falls within a shift
  const isWithinShift = (
    startTime: { hours: number; minutes: number },
    endTime: { hours: number; minutes: number },
    shiftStart: { hours: number; minutes: number },
    shiftEnd: { hours: number; minutes: number }
  ) => {
    const startInMinutes = startTime.hours * 60 + startTime.minutes;
    const endInMinutes = endTime.hours * 60 + endTime.minutes;
    const shiftStartInMinutes = shiftStart.hours * 60 + shiftStart.minutes;
    const shiftEndInMinutes = shiftEnd.hours * 60 + shiftEnd.minutes;

    return (
      startInMinutes >= shiftStartInMinutes && endInMinutes <= shiftEndInMinutes
    );
  };

  // Get the shift data from the court
  const { morningShift, dayShift, eveningShift, holidayShift } = selectedCourt;

  // Calculate the total price by checking each selected time slot
  let totalPrice = 0;

  selectedTimeSlots.forEach((slot) => {
    const [start, end] = slot.split(" - ");
    const startTime = parseTime(start);
    const endTime = parseTime(end);

    // Check if it’s a holiday and if slot falls in holiday shift
    if (isHoliday) {
      const holidayStart = parseTime(holidayShift.startTime);
      const holidayEnd = parseTime(holidayShift.endTime);
      if (isWithinShift(startTime, endTime, holidayStart, holidayEnd)) {
        totalPrice += parseInt(holidayShift.price);
        return;
      }
    }

    // Not a holiday or out of holiday shift, check other shifts
    const shifts = [
      { shift: morningShift, name: "morningShift" },
      { shift: dayShift, name: "dayShift" },
      { shift: eveningShift, name: "eveningShift" },
    ];

    for (const { shift } of shifts) {
      const shiftStart = parseTime(shift.startTime);
      const shiftEnd = parseTime(shift.endTime);
      if (isWithinShift(startTime, endTime, shiftStart, shiftEnd)) {
        totalPrice += parseInt(shift.price);
        break;
      }
    }
  });

  return totalPrice;
};

const BookingConfirmationPage = ({
  setcompleteBooking,
  selectedDate,
  selectedTimeSlots,
  selectedCourt,
}: any) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PLAYER | null>(null); // Selected player state
  const [playerLists, setPlayerLists] = useState<PLAYER[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
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
        phone: selectedPlayer.phone,
      });
    }
  }, [selectedPlayer]);

  useEffect(() => {
    const price = calculateTotalPrice(
      selectedCourt,
      selectedTimeSlots,
      selectedDate
    );
    setTotalPrice(price);
  }, [selectedCourt, selectedTimeSlots, selectedDate]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
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
        slotsTotal: totalPrice,
        netTotal: totalPrice,
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
            Player Details
          </h2>

          {/* If Player Selected */}
          {selectedPlayer && (
            <div className="bg-white p-4 rounded-md  flex justify-between shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] relative">
              <div className="flex items-center gap-5">
                {selectedPlayer.image ? (
                  <img
                    src={`${MINIOURL}${selectedPlayer.image}`}
                    alt={selectedPlayer.name}
                    className="w-[5.875rem] h-[5.875rem] rounded-full mr-4 "
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full flex justify-center items-center bg-primary text-3xl text-white">
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
              <button
                className="text-red-500 font-bold absolute top-5 right-5"
                onClick={handleRemovePlayer}
              >
                <X />
              </button>
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
                                className="w-8 h-8 rounded-full mr-2"
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
                <span>Rs. {totalPrice}</span>
              </div>
              <div className="flex justify-end font-bold mb-4 gap-2">
                <span>Total:</span>
                <span className="text-green-500">Rs. {totalPrice}</span>
              </div>
              <div className="flex justify-end items-center gap-3">
                <button
                  disabled={Loading}
                  onClick={() => setcompleteBooking(false)}
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

export default BookingConfirmationPage;
