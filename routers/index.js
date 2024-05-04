const authRouter = require("./authRouter");
const meetingRouter = require("./meetingRouter");
const employeeRouter = require("./employeeRouter");
const express = require("express");
const app = express();
const BASE_PATH = "V1";

app.use(`/${BASE_PATH}/auth`, authRouter);
app.use(`/${BASE_PATH}/meeting`, meetingRouter);
app.use(`/${BASE_PATH}/employee`,employeeRouter);

module.exports = app;
