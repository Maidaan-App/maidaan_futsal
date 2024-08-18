const Minio = require("minio");

const minioClient = new Minio.Client({
  endPoint: "193.203.161.79",
  port: 9001,
  useSSL: false, // Set to true if you're using HTTPS
  accessKey: "bgyanaccelerator",
  secretKey: "bgyanaccelerator",
});

module.exports = minioClient;
