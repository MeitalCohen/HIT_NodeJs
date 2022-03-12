const UserChanges = require('./userChanges');

exports.save = async (userChanges) => {
    try{
      let usrChanges = UserChanges(userChanges);
      return await usrChanges.save();
    }
      catch(error)
      {
        console.error(error);
        return null;
      }
  }