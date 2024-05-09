const authRouter = require("./authRouter");
const meetingRouter = require("./meetingRouter");
const employeeRouter = require("./employeeRouter");
const designationRouter = require("./designationRouter");
const organizationRouter = require("./organizationRouter");
const departmentRouter = require("./departmentRouter");
const roomsRouter = require("./roomsRouter");
const configRouter = require("./configRouter");
const express = require("express");
const app = express();
const BASE_PATH = "V1";

app.use(`/${BASE_PATH}/auth`, authRouter);
app.use(`/${BASE_PATH}/meeting`, meetingRouter);
app.use(`/${BASE_PATH}/employess`, employeeRouter);
app.use(`/${BASE_PATH}/designation`, designationRouter);
app.use(`/${BASE_PATH}/organization`, organizationRouter);
app.use(`/${BASE_PATH}/department`, departmentRouter);
app.use(`/${BASE_PATH}/employee`, employeeRouter);
app.use(`/${BASE_PATH}/rooms`, roomsRouter);
app.use(`/${BASE_PATH}/configurations`, configRouter);

module.exports = app;
