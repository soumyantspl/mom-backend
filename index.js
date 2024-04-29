const express = require('express')
const app = express()
const port = 3000
console.log("In index.js file");
app.listen(port, () => {
    console.log(`MOM application is running on ${port}`);
}) 
