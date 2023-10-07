const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const userRoute = require('./routes/userRoute');
const app = express();
app.use(express.json());


app.use('/api/v1/user', userRoute);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app
