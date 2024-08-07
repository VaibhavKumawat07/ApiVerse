const server = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DataBase Connection is successfull....");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas", error);
  });
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server is started....");
});
