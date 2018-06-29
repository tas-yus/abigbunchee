var mongoose = require("mongoose");

var MonthlySchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  result: {
    numLate1: {
      type: Number,
      default: 0
    },
    numLate2: {
      type: Number,
      default: 0
    },
    numLate3: {
      type: Number,
      default: 0
    },
    numHoliday: {
      type: Number,
      default: 0
    },
    numSick: {
      type: Number,
      default: 0
    },
    numAffair: {
      type: Number,
      default: 0
    },
    numVacation: {
      type: Number,
      default: 0
    },
    numAbsent: {
      type: Number,
      default: 0
    },
    numOT: {
      type: Number,
      default: 0
    },
    others: {
      type: Number,
      default: 0
    },
    bonus: {
      type: Number,
      default: 0
    },
    returnVacation: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    }
  },
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Daily"
  }],
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  },
  checked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  emitIndexErrors: true
});

module.exports = mongoose.model("Monthly", MonthlySchema);
