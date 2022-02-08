const express = require("express");
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const dotenv = require("dotenv")
const res = require("express/lib/response");
const app = express();
const req = require("express/lib/request");
const ObjectId = mongoose.Types.ObjectId;

const PORT = 3000

// requiring database
const connectDB = require("./config/dbConnection");
connectDB();

// requiring routes
app.use("/crudEvents" ,require("./routes/crudRoute"))

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () =>{
    console.log(`server is running at http://localhost:${PORT}`)
})
