require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;
const connect = require("./connect");
const noteRoute = require("./routes/noteRoutes");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/",noteRoute);

app.listen(port,()=>{
    console.log(`server is listening on port  ${port}`);
});