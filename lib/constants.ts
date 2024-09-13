export const MINIOURL = "https://uploads.clockb.io/maidaan/";
export const userTypes = [
  "admin",
  "superadmin",
  "player",
];

export const BUCKET_NAME = "maidaan";
export const DOMAIN =
  process.env.NODE_ENV == "production"
    ? process.env.DOMAIN
    : "http://localhost:3000/";

export const statusTypes = ["pending", "enrolled", "blocked"];
export const bookingStatusTypes = ["prebooked", "soldout", "booked"];

