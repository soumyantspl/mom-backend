require("dotenv").config();
const express = require("express");
const app = express();
const mainRouter = require("./routers/index");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnection = require("./dbLayer/connection");
dbConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone, x-token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  next();
});

app.use("/api", mainRouter);

app.listen(PORT, () => {
  console.log("Server is running on port:- " + PORT);
});
