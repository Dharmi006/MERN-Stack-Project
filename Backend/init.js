const connect = require("./connect");
const Notes = require("./models/note");

let allnote = [
    {
        title:"Learning react",
        content:"react is javascript library",
    },
    {
        title:"node.js basics",
        content:"node.js is a javascript runtime environment",
    },
    {
        title:"Express.js guide",
        content:"express.js is backend fremwork",
    },

]

async function add() {
    await Notes.insertMany(allnote);
    console.log("data inserted");
};

add();
