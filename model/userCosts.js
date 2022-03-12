const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userCostsSchema = new Schema(
  {
    description: {type: String, required: true},
    sum: {type: Number, min: 0, required: true},
    username: { type: String, ref: 'User', required: true },
    date: {type: Date,required: true},
    category: { type:String, enum : ['Food','Health', 'Sport', 'Education', 'Housing', 'Other'], default: 'Other', required: true}
  }
);

module.exports = mongoose.model('UserCosts', userCostsSchema);