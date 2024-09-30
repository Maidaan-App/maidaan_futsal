"use client";
import React, { useEffect, useState } from "react";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import UploadCourtCard from "./UploadCourtCard";

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

  // Handle time change
  const handleTimeChange = (key: keyof ShiftTimes, newValue: Dayjs | null) => {
    setShifts((prevShifts) => {
      const updatedShifts: ShiftTimes = {
        ...prevShifts,
        [key]: newValue,
      };

      // Implementing your time logic
      if (key === "morningShiftEnd") {
        updatedShifts.dayShiftStart = newValue;
      } else if (key === "dayShiftEnd") {
        updatedShifts.eveningShiftStart = newValue;
      } else if (key === "eveningShiftEnd") {
        updatedShifts.holidayShiftStart = newValue;
      }

      // If you want to set the opening and closing time based on shifts
      updatedShifts.morningShiftStart =
        updatedShifts.morningShiftStart || newValue;
      updatedShifts.eveningShiftEnd = updatedShifts.eveningShiftEnd || newValue;

      return updatedShifts;
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Shift Times:", shifts);
    // Here you can add logic to send the data to your backend
  };

  return (
    <div className="flex md:flex-row flex-col justify-between gap-4">
      <UploadCourtCard />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="bg-white p-5 rounded-lg shadow-lg lg:w-[820px]">
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
                value={shifts.morningShiftStart}
                onChange={(newValue) =>
                  handleTimeChange("morningShiftStart", newValue)
                }
                className="w-full"
              />

              <TimePicker
                label="Closing Time"
                value={shifts.eveningShiftEnd}
                onChange={(newValue) =>
                  handleTimeChange("eveningShiftEnd", newValue)
                }
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
                    value={shifts[shift.start as keyof ShiftTimes]}
                    onChange={(newValue) =>
                      handleTimeChange(
                        shift.start as keyof ShiftTimes,
                        newValue
                      )
                    }
                    className="md:w-1/3"
                  />

                  <TimePicker
                    label="End Time"
                    value={shifts[shift.end as keyof ShiftTimes]}
                    onChange={(newValue) =>
                      handleTimeChange(shift.end as keyof ShiftTimes, newValue)
                    }
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
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default CourtForm;
