import { Montserrat, Poppins } from "next/font/google";

export const MINIOURL = "https://uploads.clockb.io/maidaan/";
export const userTypes = ["admin", "superadmin", "player"];

export const BUCKET_NAME = "maidaan";
export const DOMAIN =
  process.env.NODE_ENV == "production"
    ? process.env.DOMAIN
    : "http://localhost:3000/";

export const statusTypes = ["pending", "enrolled", "blocked"];
export const bookingStatusTypes = ["Reserved", "Pre-Booked", "Booked", "Completed", "Cancelled"];
export const AddBookingStatusTypes = ["Reserved", "Pre-Booked", "Booked"];
export const adminBookingStatusTypes = ["All" , "Reserved", "Pre-Booked", "Booked", "Completed", "Cancelled", ];
export const courtShifts = [
  { label: "morningShift", value: "Morning Shift" },
  { label: "dayShift", value: "Day Shift" },
  { label: "eveningShift", value: "Evening Shift" },
  { label: "holidayShift", value: "Holiday (Saturday)" },
];

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
