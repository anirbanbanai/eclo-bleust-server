const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 4000;

app.use(cors())
app.use(express.json());


app.use('/', (req, res) => {
    res.send('Assignment 12 running')
})
app.listen(port, (req, res) => {
    console.log(`This isfd server running on ${port}`);
})