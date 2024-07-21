const express = require('express');
const mongoose = require('mongoose');
const alarmRoutes = require('./routes/routes');
const Clock = require('./clock'); // The Clock class to display time
require('dotenv').config();
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/alarmclock', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(alarmRoutes);

const clock = new Clock();
// clock.displayTime();

module.exports= app ;