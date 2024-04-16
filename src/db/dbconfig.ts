import mongoose from "mongoose";

export async function connect() {
  const db_url = process.env.MONGODB_URL;
  try {
    mongoose.connect(db_url!).then(() => console.log("Mongodb_connected"));
  } catch (error) {
    console.log(error);
  }
}
