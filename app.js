'use strict';
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const http = require('http');
const app = express();
const { mongoConnect } = require("./clients/mongoose");

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json({ limit: '50mb' }));
// routes
app.use('/comments', require('./routes/comments')());
app.use('/', require('./routes/profile')());

mongoConnect();
const server = new http.Server(app);

module.exports = {
    server, app
}