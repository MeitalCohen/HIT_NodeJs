const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthday: {type: Date, required:true},
    maritalStatus: {type: String, enum:['Single', 'Married', 'Divorced', 'Widow', 'Complicated']},
    children: {type: Number,min: 0, max: 99, default:0, required: false},
    pets: {type: Number,min: 0, max: 99, default:0, required: false},
    version: {type: Number,min: 1, default:1, required: true},
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;