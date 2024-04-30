
const express = require('express');
const app = express();
const mainRouter = require("./routers/index")
const dbConnection = require('./dbLayer/connection')
dbConnection()
const port = 8000
app.use('/api', mainRouter)
app.listen(port, () => {
    console.log("Server is running on port:- " + port);
});
