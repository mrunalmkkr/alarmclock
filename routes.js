const express = require('express');
const alarmController = require('../controllers/controller');
const router = new express.Router();

router.post('/alarms', alarmController.createAlarm);
router.delete('/alarms/:id', alarmController.deleteAlarm);
router.post('/alarms/:id/snooze', alarmController.snoozeAlarm);
router.get('/alarms', alarmController.getAlarms);

module.exports = router ;
