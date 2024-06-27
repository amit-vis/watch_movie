const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./config/database")
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/", require("./routes"))
app.listen(port, (err)=>{
    if(err){
        console.log("Error in listening to the server",err)
    }
    console.log("server is the listening the port", port)
})