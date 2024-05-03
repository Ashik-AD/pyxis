import mongoose from "mongoose";

export function initDatabaseConnection() {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connection established sucessfull");
  } catch (e) {
    console.log(e.message);
  }
}

export { mongoose };
