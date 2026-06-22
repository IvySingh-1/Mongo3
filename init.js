require("dotenv").config();
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

let allChats = [
  {
    from: "priya",
    to: "neha",
    msg: "hi how are you",
    created_at: new Date(),
  },
  {
    from: "shantanu",
    to: "rohan",
    msg: "all the best",
    created_at: new Date(),
  },
  {
    from: "siddhi",
    to: "kashish",
    msg: "today is a beautiful day",
    created_at: new Date(),
  },
  {
    from: "alice",
    to: "sanya",
    msg: "you look stunning",
    created_at: new Date(),
  },
  {
    from: "meera",
    to: "lakshmi",
    msg: "weather is pleasant",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
