var mongoose = require('mongoose');

var DayToDaySchema = new mongoose.Schema({
  in: {
    hour: {
      type: Number,
      required: true
    },
    minute: {
      type: Number,
      required: true
    }
  },
  out: {
    hour: {
      type: Number,
      required: true
    },
    minute: {
      type: Number,
      required: true
    }
  }
});

var Scheduleschema = new mongoose.Schema({
  type: {
    type: Number
  },
  title: {
    type: String,
    required: true
  },
  usual: {
    0: DayToDaySchema,
    1: DayToDaySchema,
    2: DayToDaySchema,
    3: DayToDaySchema,
    4: DayToDaySchema,
    5: DayToDaySchema,
    6: DayToDaySchema,
    7: DayToDaySchema
  },
  break: {
    0: DayToDaySchema,
    1: DayToDaySchema,
    2: DayToDaySchema,
    3: DayToDaySchema,
    4: DayToDaySchema,
    5: DayToDaySchema,
    6: DayToDaySchema,
    7: DayToDaySchema
  }
});

module.exports = mongoose.model('Schedule', Scheduleschema);
