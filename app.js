const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const { dbConnect } = require('./config/mongo.db');

// config
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Middlewares
app.use(express.json());
app.use(cors());

app.use('/api/1.0/', require('./app/routes/index.routes'))

dbConnect();

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});



// // Routes
// app.use(require('./routes/index.routes'));
// app.use(require('./routes/users.routes'));
// app.use(require('./routes/twits.routes'));

// const dbb = require('./src/database');

