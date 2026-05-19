require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

const noteRoute = require("./routes/noteRoutes");
app.use("/", noteRoute);

const port = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    app.listen(port, () => {
        console.log("server is listening on port " + port);
    });
})
.catch((err) => {
    console.log(err);
});