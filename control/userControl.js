const userQueries = require("../model/userQueries");
const userChangesQueries = require("../model/userChangesQueries");
const User = require('../model/user');
const UserChanges = require("../model/userChanges");


exports.loginUser = async (username, password) =>{
    let existedUser = await userQueries.fetchByUsername(username);
    if(!existedUser){
        throw new Error('Username or password is incorrect');
    }
  if (!password === existedUser.password){
      throw new Error('Username or password is incorrect');
   }
   return existedUser;
};

exports.getUserByUsername = async (username) =>{
  let existedUser = await userQueries.fetchByUsername(username);
  if(existedUser == null || Object.keys(existedUser).length === 0){
      throw new Error('User not found');
  }
  return existedUser;
};

exports.saveNewUser = async (requestUser) =>{
  const newUser = new User({
      username: requestUser.username,
      password: requestUser.password,
      firstName: requestUser.firstName,
      lastName: requestUser.lastName,
      birthday: requestUser.birthday,
      maritalStatus: requestUser.maritalStatus,
      children: requestUser.children,
      pets: requestUser.pets,
      version: 1,
  });
  let savedUser = await userQueries.save(newUser);
  if(savedUser == null || Object.keys(savedUser).length === 0){
      throw new Error('Internal Error');
  }
  return savedUser;
};



exports.updateUser = async (requestUser) =>{
  let currentUser = await userQueries.fetchByUsername(requestUser.username);
  if (currentUser == null ){
      throw (new Error('User not exist'));
  }

  const password = requestUser.password == null ? currentUser.password : requestUser.password;

  let newUserVersion = currentUser.version + 1;
  
  let newUser = new User({
      username: requestUser.username,
      password: password,
      firstName: requestUser.firstName,
      lastName: requestUser.lastName,
      birthday: requestUser.birthday,
      maritalStatus: requestUser.maritalStatus,
      children: requestUser.children,
      pets: requestUser.pets,
      version: newUserVersion,
  });

  //Upate user in User collection
  let savedUser = await userQueries.update(newUser);
  if(savedUser == null || Object.keys(savedUser).length === 0){
      throw(new Error('Internal Error'));
  }

  //Save user version into User Changes collection
  const usrChanges = new UserChanges({
      username: requestUser.username,
      password: password,
      firstName: requestUser.firstName,
      lastName: requestUser.lastName,
      birthday: requestUser.birthday,
      children: requestUser.children,
      pets: requestUser.pets,
      revision: newUserVersion,
  });
  let updateUser = await userChangesQueries.save(usrChanges);
  if(updateUser == null || Object.keys(updateUser).length === 0){
      throw new Error('Internal Error');
  }

  console.log('Update user ' + JSON.stringify(savedUser));
  return newUser;
};