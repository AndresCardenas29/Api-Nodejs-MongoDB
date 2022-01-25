const express = require('express');
const app = express();
const dotenv = require('dotenv').config();


// config
const port = process.env.PORT;
const host = process.env.HOST;

// Middlewares
app.use(express.json());



// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/twits.routes'));

module.exports = [app, port, host];