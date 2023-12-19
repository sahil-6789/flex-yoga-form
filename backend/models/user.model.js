const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
  },
  gender: {
    type: String,
    required : true,
    enum: ["default","male", "female",]
  },
  contact: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Validate that contact is a 10-digit number
      },
      message: (props) => `${props.value} is not a valid 10-digit number!`,
    },
  },
  slot: {
    type: String,
    required: true,
    enum: ["default","6-7AM", "7-8AM", "8-9AM", "5-6PM"],
  },
  updated_slot: {
    type: String,
    enum: ["default","6-7AM", "7-8AM", "8-9AM", "5-6PM"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
