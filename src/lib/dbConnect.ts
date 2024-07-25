// Next js is working on edge time for example-->
// in other framework database or server connection is once connect and remain connected always.
// but in nextjs when request or function execute DB connection established.
// so we have to check if there is DB is connected or not before connection again and again.

import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {});

    // console.log({ databaseObject: db });

    connection.isConnected = db.connections[0].readyState;

    console.log("Database Connected Successfully 👍🏻👍🏻👍🏻");
  } catch (error) {
    console.log("Database Connection Failed 🚫🚫🚫--> ", error);
    process.exit(1);
  }
}

export default dbConnect;
