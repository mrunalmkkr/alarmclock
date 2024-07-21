const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  time: { type: String, required: true }, // Format: "HH:MM"
  dayOfWeek: { type: String, required: true,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
   }, 
  snoozeCount: { type: Number, default: 0 },
  maxSnoozeCount: { type: Number, default: 3 }
});

module.exports = mongoose.model('Alarm', alarmSchema);
