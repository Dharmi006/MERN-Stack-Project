const mongoose = require("mongoose");
require("dotenv").config();
main()
.then(()=>{
    console.log("connect succesfull");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}