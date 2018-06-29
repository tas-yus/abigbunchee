var mongoose = require('mongoose');

var Employeeschema = new mongoose.Schema({
    // username: {type: String, required: true, unique: true},
    // password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    alias: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    branch: {type: Number, required: true},
    salary: {type: Number, default: 0},
    // isAdmin: {type: Boolean, default: false},
    // isSetting: {type: Boolean, default: false},
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily",
        default: []
      }
    ],
    monthlyReports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Monthly",
        default: []
      }
    ],
    // 0 = backline, 1 = general, 2 = part-time, 3 = getaway
    status: {
      type: Number,
      default: 1
    },
    weekDayOff: {
      type: Number,
      default: 0
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule"
    },
    percentFund: {
      type: Number,
      default: 1
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    scheduleCode: String
});

module.exports = mongoose.model('Employee', Employeeschema);
