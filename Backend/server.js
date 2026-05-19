require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 10000;
const connectDB = require("./connect");
connectDB();
const noteRoute = require("./routes/noteRoutes");
app.use(express.json());
app.use(cors());
app.use("/", noteRoute);

app.listen(port, () => {
  console.log("server is listening on port " + port);
});