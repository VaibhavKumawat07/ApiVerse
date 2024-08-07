const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const food = require("../Model/apis/carHubModel");
const fs = require("fs");
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

const recipes = JSON.parse(
  fs.readFileSync(`${__dirname}/carHubData.json`, "utf-8")
);

//Import Data
const importData = async () => {
  try {
    await food.create(recipes);
    console.log("Data succesfully imported..");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await food.deleteMany();
    console.log("Data successfully deleted....");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
