const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.mongourl);
const db = mongoose.connection;

db.on("error",console.error.bind(console, "error in connecting to the db"));

db.once("open", ()=>{
    console.log("database connected successfully!!")
});

module.exports = db;

