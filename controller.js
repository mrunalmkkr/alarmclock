const Alarm = require('../models/model');

exports.createAlarm = async (req, res) => {
  try {
    const {time, dayOfWeek,snoozeCount,maxSnoozeCount } = req.body;
    if (!(time && dayOfWeek && snoozeCount && maxSnoozeCount)) {
      res.status(400).send('all fields are required')

      const alarm = await Alarm.findOne({ time,dayOfWeek}); //promise

      if (alarm) {
        res.status(401).send("user does exist")
    }

       }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteAlarm = async (req, res) => {
  try {

    const alarm = await (Alarm.create({
      time,
      dayOfWeek,
      snoozeCount,
      maxSnoozeCount
     }) )


    // const alarm = await Alarm.findByIdAndDelete(req.params.id);
    if (!alarm && Alarm.findByIdAndDelete(req.params.id)) {
      return res.status(400).send();
    }
    res.send(alarm);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.snoozeAlarm = async (req, res) => {
  const { id } = req.params;
  const alarm = await Alarm.findById(id);
  if (alarm.snoozeCount < 3) {
    alarm.time = new Date(new Date(alarm.time).getTime() + 5 * 60000); // Add 5 minutes
    alarm.snoozeCount += 1;
    await alarm.save();
    res.json(alarm);
  } else {
    res.status(400).json({ message: 'Maximum snooze limit reached' });
  }
};

exports.getAlarms = async (req, res) => {
  try {
    const alarms = await Alarm.find({});
    res.send(alarms);
  } catch (error) {
    res.status(500).send(error);
  }
};
