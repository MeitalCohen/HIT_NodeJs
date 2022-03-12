const User = require('./user');


exports.fetchByUsername = async (username) => {
  try{
  return await (await User.find()).find(usr => usr.username.toLowerCase() === username.toLowerCase());
  }
  catch(error)
  {
    console.error(error);
    return null;
  }
}

exports.save = async (user) => {
  let existingUser = await this.fetchByUsername(user.username);
  if (!existingUser){
    let usr = User(user);
    return await usr.save();
    }
    else{
      throw new Error('Username already exists');
    }
}

exports.update = async (user) => {
  try{
    let usr = User(user);
    return await User.updateOne({'username':usr.username}, 
    {$set: 
      {'password':usr.password, 'firstName' : usr.firstName, 'lastName':usr.lastName,
      'birthday':usr.birthday, 'maritalStatus':usr.maritalStatus, 'children':usr.children,
      'pets':usr.pets, 'version': usr.version}});
    }
    catch(error)
    {
      console.error(error);
      return null;
    }
  }
