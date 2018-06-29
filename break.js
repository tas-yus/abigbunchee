var mongoose = require("mongoose");

var BreakSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  }
}, {
  timestamps: true,
  emitIndexErrors: true
});

module.exports = mongoose.model("Break", BreakSchema);
