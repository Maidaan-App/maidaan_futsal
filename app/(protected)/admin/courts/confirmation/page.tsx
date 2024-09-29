"use client";

import { poppins } from "@/app/lib/constants";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Define Player Type
interface Player {
  fullName: string;
  contact: string;
  address: string;
}

// Zod schema for form validation
const playerSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(1, "Contact is required"),
  address: z.string().min(1, "Address is required"),
  bookingStatus: z.string().min(1, "Booking Status is required"),
  paymentStatus: z.string().min(1, "Payment Status is required"),
});

export default function ConfirmationPage() {
  const [isExistingPlayer, setIsExistingPlayer] = useState(false); // Toggle between forms
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null); // Selected player state
  const searchParams = useSearchParams();

  const date = searchParams.get("date") || "N/A";
  const timeSlots = JSON.parse(
    searchParams.get("timeSlots") || "[]"
  ) as string[];

  const form = useForm({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      contact: "",
      address: "",
      bookingStatus: "",
      paymentStatus: "",
    },
  });

  const onSubmit = (values: any) => {
    console.log(values); // Handle form submission
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  interface Player {
    id: number;
    name: string;
    avatar: string;
    location: string;
    contact: string;
  }

  const players: Player[] = [
    {
      id: 1,
      name: "Mahendra Magar",
      avatar:
        "https://images.unsplash.com/photo-1559718062-361155fad299?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Bishalnagar, Kathmandu",
      contact: "+977 9840874592",
    },
    {
      id: 2,
      name: "Roman Shilpakar",
      avatar:
        "https://images.unsplash.com/photo-1559718062-361155fad299?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Location 2",
      contact: "+977 984087xxxx",
    },
  ];

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPlayer = (player: Player) => {
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
        Creating a booking in <span className="text-primary">Court</span>
      </h1>

      <div className="flex flex-col lg:flex-row rounded-xl border w-full">
        {/* Left Side - Date & Slots */}
        <div className="p-5 lg:w-1/3 bg-[#FBFBFB]">
          <div>
            <p className="text-[1rem] font-medium mb-4">Selected Date</p>
            <p className="text-lg font-semibold border-[1px] border-primary h-[8.875rem] w-[8.125rem] my-5 rounded-xl flex items-center justify-center">
              <span className="text-[1.625rem] font-semibold">{date}</span>
            </p>
          </div>
          <div>
            <p className="text-[1rem] font-medium mb-4">Selected Slot(s)</p>
            <ul className="space-y-5">
              {timeSlots.map((slot, index) => (
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
                  src={selectedPlayer.avatar}
                  alt={selectedPlayer.name}
                  className="w-[5.875rem] h-[5.875rem] rounded-full mr-4 "
                />
                <div>
                  <h3 className="text-[1.125rem] font-medium mb-3">
                    {selectedPlayer.name}
                  </h3>
                  <p className="font-normal text-[#8A92A6] text-[0.75rem]">
                    {selectedPlayer.location}
                  </p>
                  <p className="text-primary font-normal text-[0.75rem]">
                    {selectedPlayer.contact}
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
              {/* Search and Display Results */}
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
                        key={player.id}
                        className="flex items-center p-2 hover:bg-green-50 cursor-pointer hover:border-l-4 hover:border-green-500"
                        onClick={() => handleSelectPlayer(player)}
                      >
                        <img
                          src={player.avatar}
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
                  <FormField
                    control={form.control}
                    name="fullName"
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
                    name="contact"
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
                              <option value="Confirmed">Confirmed</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Payment Status */}
                    <FormField
                      control={form.control}
                      name="paymentStatus"
                      render={({ field }) => (
                        <FormItem className="lg:w-1/2">
                          <FormLabel>Payment Status</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="border border-gray-300 p-3 w-full rounded-md bg-white text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 appearance-none"
                            >
                              <option value="Paid">Paid</option>
                              <option value="Unpaid">Unpaid</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* <div className="flex space-x-4"></div> */}

                  <div className="flex  justify-end mb-4 mt-3 gap-2 ">
                    <span>Slot's Total:</span>
                    <span>Rs. 2000</span>
                  </div>
                  <div className="flex justify-end font-bold mb-4 gap-2">
                    <span>Total:</span>
                    <span className="text-green-500">Rs. 2000</span>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-primary text-white px-4 py-2 rounded-md">
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
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Payment Status */}
                  <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }) => (
                      <FormItem className="lg:w-1/2">
                        <FormLabel>Payment Status</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="border border-gray-300 p-3 w-full rounded-md bg-white text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 appearance-none"
                          >
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          )}

          {selectedPlayer && (
            <div className="flex justify-between mt-4">
              <span>Slot's Total:</span>
              <span>Rs. 2000</span>
            </div>
          )}

          {selectedPlayer && (
            <div className="flex justify-between font-bold mt-2">
              <span>Net Total:</span>
              <span className="text-green-500">Rs. 2000</span>
            </div>
          )}

          {selectedPlayer && (
            <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
