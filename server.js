
const express = require('express');
const app = express();
const mainRouter=require("./routers/index")
const port=8000
app.use('/api',mainRouter)
app.listen(port, ()=>{
    console.log("Server is running on port:- "+port);
});
