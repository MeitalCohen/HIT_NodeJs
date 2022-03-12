const UserCosts = require('../model/userCosts');
const userCostsQueries = require("../model/userCostsQueries");


function WithoutTime(dateTime) {
  var date = new Date(dateTime.getTime());
  date.setHours(0, 0, 0, 0);
  return date;
}

exports.saveUserCosts = async (requestUserCosts) =>{
  const newUserCost = new UserCosts({
      description: requestUserCosts.description,
      sum: requestUserCosts.sum,
      username: requestUserCosts.username,
      date: WithoutTime(new Date()),
      category: requestUserCosts.category
  });
  
  let savedUserCosts = await userCostsQueries.save(newUserCost);
  if(savedUserCosts == null || Object.keys(savedUserCosts).length === 0){
      throw(new Error('Internal Error'));
  }
  return savedUserCosts;
};


exports.updateUserCosts = async (requestUserCosts) =>{
  const newUserCost = new UserCosts({
      description: requestUserCosts.description,
      sum: requestUserCosts.sum,
      category: requestUserCosts.category,
      _id: requestUserCosts._id
  });
  let savedUserCosts = await userCostsQueries.update(newUserCost);
  if(savedUserCosts == null || Object.keys(savedUserCosts).length === 0){
      throw(new Error('Internal Error'));
  }
  return savedUserCosts;
};


exports.deleteUsersCosts = async (userCostsId) =>{
  await userCostsQueries.delete(userCostsId);
};


exports.searchUserCosts = async (username, category = null, startDateRange = null, endDateRange = null) =>{
  return await userCostsQueries.search(username, category, startDateRange, endDateRange);
};