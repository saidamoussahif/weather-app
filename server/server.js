const express = require('express')
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const db = require('./DB/db');
const cors = require('cors')
const port = process.env.PORT || 3030
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// const {errorHandler} = require('./user/ErrorMiddleware')

db();
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(errorHandler)
app.use('/api/users',require('./users/userRoute'))


app.listen(port, ()=>{ 
    console.log(`server runing on localhost: ${port}`)
})
