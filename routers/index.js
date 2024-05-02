const authRouter = require("./authRouter");
const meetingRouter=require("./meetingRouter");
const express = require("express");
const app = express();
const BASE_PATH = "V1";


app.use(`/${BASE_PATH}/auth`, authRouter);
app.use(`/${BASE_PATH}/meeting`, meetingRouter);

module.exports = app;
