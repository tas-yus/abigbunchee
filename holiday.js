var mongoose = require("mongoose");

var HolidaySchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  emitIndexErrors: true
});

module.exports = mongoose.model("Holiday", HolidaySchema);
