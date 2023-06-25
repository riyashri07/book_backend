const mongoose = require("mongoose");

 require("dotenv").config();
const ConnectDB = async() => {
try {
        await mongoose.connect(process.env.mongoUrl);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Cant connect to DB: " + error);
    }
};

module.exports = ConnectDB;




