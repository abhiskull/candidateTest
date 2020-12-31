
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let testScore = new Schema({
  name: {
    type: String,
    required: true
  },
  test:[
      {
        roundNumber: {
            type: Number,
            required: true
        },
        roundScore: {
            type: Number,
            required: true
        },
        maximumRoundScore: {
            type: Number,
            default: 10
        }
      }
  ],
  totalScore: {
    type: Number
  } 
});

module.exports = mongoose.model("testScore", testScore);