require("dotenv").config();

const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

const dbUrl = process.env.ATLASDB_URL;

let allChats = [
  {
    from: "Ishita",
    to: "Arjun",
    msg: "Good luck for your interview today.",
    created_at: new Date(),
  },
  {
    from: "Ivy",
    to: "Yash",
    msg: "Hey, are we meeting after class today?",
    created_at: new Date(),
  },
  {
    from: "Neha",
    to: "Vikram",
    msg: "Can you send me the notes?",
    created_at: new Date(),
  }
];

async function main() {
  try {
    await mongoose.connect(dbUrl);

    console.log("connection successful");

    await Chat.insertMany(allChats);

    console.log("Data inserted");

    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
}

main();
