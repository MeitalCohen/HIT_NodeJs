const UserCosts = require('./userCosts');

exports.save = async (userCosts) => {
    try{
      let usrCosts = UserCosts(userCosts);
      return await usrCosts.save();
    }
      catch(error)
      {
        console.error(error);
        return null;
      }
  }

exports.update = async (userCosts) => {
    try{
      let usr = UserCosts(userCosts);
      return await UserCosts.updateOne({'_id':usr._id}, 
      {$set: 
        {'description':usr.description, 'sum' : usr.sum, 'category':usr.category}});
      }
      catch(error)
      {
        console.error(error);
        return null;
      }
    }

exports.delete = async (userCostsId) => {
    try{
        return await UserCosts.deleteOne({'_id': userCostsId});
    }
    catch(error){
        console.error(error);
        return null;
    }
}

exports.search = async (username, category = null, startDateRange = null, endDateRange = null) =>
{
    try{
        let query = UserCosts.find({});
        if(username){
            query.where('username').equals(username);
        }

        if(category){
            query.where('category').equals(category);
        }

        if(startDateRange && endDateRange){
            query.where('date').gte(startDateRange).lte(endDateRange);
        }

        console.log('Find User Costs Query to Execute: ' + query);
        return await query.exec();
    }
    catch(error){
        console.error(error);
        return null;
    }
}