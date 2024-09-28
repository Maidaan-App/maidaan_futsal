"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { z } from "zod";
import { Clock4 } from "lucide-react";
import { poppins } from "@/app/lib/constants";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Define Zod schema for validation
const formSchema = z.object({
  courtName: z.string().min(1, {
    message: "Court Name is required",
  }),
});

// Define type for shift times
interface ShiftTimes {
  morningShiftStart: Dayjs | null;
  morningShiftEnd: Dayjs | null;
  dayShiftStart: Dayjs | null;
  dayShiftEnd: Dayjs | null;
  eveningShiftStart: Dayjs | null;
  eveningShiftEnd: Dayjs | null;
  holidayShiftStart: Dayjs | null;
  holidayShiftEnd: Dayjs | null;
}

const CourtForm: React.FC = () => {
  // Define shift states
  const [shifts, setShifts] = useState<ShiftTimes>({
    morningShiftStart: dayjs(),
    morningShiftEnd: dayjs(),
    dayShiftStart: dayjs(),
    dayShiftEnd: dayjs(),
    eveningShiftStart: dayjs(),
    eveningShiftEnd: dayjs(),
    holidayShiftStart: dayjs(),
    holidayShiftEnd: dayjs(),
  });

  // Handle form submission
  const onSubmit = (data: Record<string, any>) => {
    console.log("Form Data:", data);
  };

  // Handle time change
  const handleTimeChange = (key: keyof ShiftTimes, newValue: Dayjs | null) => {
    setShifts((prevShifts) => ({
      ...prevShifts,
      [key]: newValue,
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        className={`bg-white p-5 rounded-lg shadow-lg lg:w-[820px] ${poppins.className}`}
      >
        <div className="flex flex-col gap-6">
          {/* Court Name */}
          <TextField
            id="court-name"
            label="Court Name"
            variant="outlined"
            defaultValue="Court 1"
            className="w-full"
          />

          {/* Opening Time and Closing Time */}
          <div className="flex md:flex-row flex-col gap-5">
            <TimePicker
              label="Opening Time"
              defaultValue={shifts.morningShiftStart}
              className="w-full"
            />

            <TimePicker
              label="Closing Time"
              defaultValue={shifts.morningShiftEnd}
              className="w-full"
            />
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-10 h-px bg-[#28353D1A]" />

        {/* Shifts Section */}
        <div>
          <h1 className="font-semibold text-[#28353D] text-lg">Shifts</h1>

          {/* Shift Fields */}
          {[
            {
              name: "Morning Shift",
              start: "morningShiftStart",
              end: "morningShiftEnd",
            },
            { name: "Day Shift", start: "dayShiftStart", end: "dayShiftEnd" },
            {
              name: "Evening Shift",
              start: "eveningShiftStart",
              end: "eveningShiftEnd",
            },
            {
              name: "Holiday (Saturday)",
              start: "holidayShiftStart",
              end: "holidayShiftEnd",
            },
          ].map((shift, idx) => (
            <div
              key={idx}
              className="flex md:flex-row flex-col justify-between items-center gap-4 mt-4"
            >
              <p className="md:w-1/4 w-full text-[#28353D] text-base font-medium">
                {shift.name}
              </p>
              <div className="flex md:flex-row flex-col gap-4 w-full md:w-3/4">
                <TimePicker
                  label="Start Time"
                  defaultValue={shifts.morningShiftEnd}
                  className="md:w-1/3"
                />

                <TimePicker
                  label="End Time"
                  defaultValue={shifts.morningShiftEnd}
                  className="md:w-1/3"
                />
                <TextField
                  id={`${shift.name
                    .toLowerCase()
                    .replace(/ /g, "-")}-offer-rate`}
                  label="Offer Rate"
                  type="number"
                  variant="outlined"
                  className="md:w-1/3"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            className="bg-green-500 w-full md:w-auto text-white px-6 py-2 rounded-md hover:bg-green-600"
          >
            Submit
          </Button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default CourtForm;
