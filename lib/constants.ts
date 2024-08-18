export const MINIOURL = "https://uploads.clockb.io/maidaan/";
export const userTypes = [
  "admin",
  "player"
];

export const BUCKET_NAME = "maidaan";
export const DOMAIN =
  process.env.NODE_ENV == "production"
    ? process.env.DOMAIN
    : "http://localhost:3000/";
