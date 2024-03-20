'use strict';
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const { mongoConnect } = require("./clients/mongoose");

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json({ limit: '50mb' }));
// routes
app.use('/', require('./routes/profile')());

// start server
mongoConnect();
const server = app.listen(port);
console.log('Express started. Listening on %s', port);

module.exports = {
    server, app
}