const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userChangesSchema = new Schema(
  {
    username: { type: String, ref: 'User', required: true },
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthday: {type: Date, required:true},
    children: {type: Number,min: 0, max: 99, default:0, required: false},
    pets: {type: Number,min: 0, max: 99, default:0, required: false},
    revision: {type: Number,min: 0, max: 99, default:0, required: false}
  }
);

module.exports = mongoose.model('UserChanges', userChangesSchema);