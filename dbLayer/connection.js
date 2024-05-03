const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/MOM";

const dbConnection = async () => {
  mongoose
    .connect(dbUrl)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err.message));
};
module.exports = dbConnection;
