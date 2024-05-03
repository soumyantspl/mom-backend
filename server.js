require("dotenv").config();
const express = require("express");
const app = express();
const mainRouter = require("./routers/index");
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require('./dbLayer/connection');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOpts = {
  origin: "*",
  methods: ["GET, POST, PUT, DELETE, OPTIONS, PATCH"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
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
//mongodb connection using mongoose
connectDB();
app.get("/", (req, res) => {
  res.send("Welcome to MOM API!");
});
app.use("/api", mainRouter);

/*Listen express server on port*/
app.listen(PORT, () => {
  console.info(`Server is running on port.... ${PORT}`);
});
