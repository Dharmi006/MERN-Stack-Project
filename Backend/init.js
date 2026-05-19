require("dotenv").config();

const mongoose = require("mongoose");
const Note = require("./models/note");

let allnote = [
    {
        title: "Learning react",
        content: "react is javascript library",
    },
    {
        title: "node.js basics",
        content: "node.js is a javascript runtime environment",
    },
    {
        title: "Express.js guide",
        content: "express.js is backend framework",
    },
];

async function add() {
    try {

        // Connect MongoDB first
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        // Insert data
        await Note.insertMany(allnote);

        console.log("Data Inserted Successfully");

        // Close connection
        mongoose.connection.close();

    } catch (err) {
        console.log(err);
    }
}

add();