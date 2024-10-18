import { Montserrat, Poppins } from "next/font/google";

export const MINIOURL = "https://uploads.clockb.io/maidaan/";
export const userTypes = ["admin", "superadmin", "player"];

export const BUCKET_NAME = "maidaan";
export const DOMAIN =
  process.env.NODE_ENV == "production"
    ? process.env.DOMAIN
    : "http://localhost:3000/";

export const statusTypes = ["pending", "enrolled", "blocked"];
export const bookingStatusTypes = ["Pre-Booked", "Sold", "Booked"];

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
