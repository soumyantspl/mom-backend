const authRouter = require("./authRouter");
const meetingRouter = require("./meetingRouter");
const employeeRouter = require("./employeeRouter");
const designationRouter = require("./designationRouter");
const organizationRouter = require("./organizationRouter");
const departmentRouter = require("./departmentRouter");
const unitRouter = require("./unitRouter");
const roomsRouter = require("./roomsRouter");
const configRouter = require("./configRouter");
const agendaRouter = require("./agendaRouter");
const minutesRouter = require("./minutesRouter");
const actionRouter = require("./actionRouter")
const logRouter = require("./logRouter");
const express = require("express");
const app = express();
const BASE_PATH = "V1";

app.use(`/${BASE_PATH}/auth`, authRouter);
app.use(`/${BASE_PATH}/meeting`, meetingRouter);
app.use(`/${BASE_PATH}/designation`, designationRouter);
app.use(`/${BASE_PATH}/organization`, organizationRouter);
app.use(`/${BASE_PATH}/department`, departmentRouter);
app.use(`/${BASE_PATH}/employee`, employeeRouter);
app.use(`/${BASE_PATH}/room`, roomsRouter);
app.use(`/${BASE_PATH}/unit`, unitRouter);
app.use(`/${BASE_PATH}/configuration`, configRouter);
app.use(`/${BASE_PATH}/agenda`, agendaRouter);
app.use(`/${BASE_PATH}/minutes`, minutesRouter);
app.use(`/${BASE_PATH}/action`, actionRouter);
app.use(`/${BASE_PATH}/log`, logRouter);

module.exports = app;
