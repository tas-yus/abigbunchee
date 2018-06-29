var mongoose = require("mongoose");

var DailySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
  },
  // lateStatus - 0 = ontime, 1 = 5 min late, 2 = 10 min late, 3 = 15 min late
  lateStatus: {
    type: Number,
    default: 0
  },
  onHoliday: {
    type: Boolean,
    default: false
  },
  onDayOff: {
    type: Boolean,
    default: false
  },
  // absentStatus - 0 = กิจ, 1 = sick, 2 = วันหยุด, 3 = พักร้อน, 4 = ท้อง, 5 = ขาด
  absentStatus: {
    type: Number
  },
  absentDays: {
    type: Number
  },
  absent: {
    type: Boolean,
    default: false
  },
  excused: {
    type: Boolean,
    default: false
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  },
  otDetected: {
    type: Boolean,
    default: false
  },
  ot: {
    type: Boolean,
    default: false
  },
  otHours: {
    type: Number,
    default: 0
  },
  isHoliday: {
    type: Boolean,
    default: false
  },
  isBreak: {
    type: Boolean,
    default: false
  },
  isDayOff: {
    type: Boolean,
    defult: false
  },
  comment: {
    type: String,
    default: ""
  }
}, {
  timestamps: true,
  emitIndexErrors: true
});

module.exports = mongoose.model("Daily", DailySchema);
