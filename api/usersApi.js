const userControl = require('../control/userControl');

module.exports = function (app) {
    app.get('/users/maritalStatus',getMaritalStatus);
    app.get('/users',getUserByUsername);
    app.post('/users/add', addUser);
    app.post('/users/update', updateUser);
    app.post('/users/login', login);
};

async function getMaritalStatus(request, response)
{
    try{
        const maritalStatus = ['Single', 'Married', 'Divorced', 'Widow', 'Complicated'];
        response.status(200).send(maritalStatus);
    }
    catch(error){
        console.error(error);
        response.status(500).send(error.message);
    }
}

async function getUserByUsername(request, response)
{
    const username = request.query.username;
    try{
        let user = await userControl.getUserByUsername(username);
        response.status(200).send(user);
    }
    catch(error){
        console.error(error);
        response.status(500).send(error.message);
    }
}

async function addUser(request, response)
{
    let newUser = request.body.user;
    try{
        if(!hasWhiteSpace(newUser.username)){
            let user = await userControl.saveNewUser(newUser);
            response.status(201).send(user);
        }
        else{
            throw new Error('Invalid username');
        }
    }
    catch(error){
        console.error(error);
        response.status(500).send(error.message);
    }
}

async function updateUser(request, response)
{
    let userToUpdate = request.body.user;
    try{
        if(!hasWhiteSpace(userToUpdate.username)){
            let updatedUser = await userControl.updateUser(userToUpdate);
            response.status(200).send(updatedUser);
        }
        else{
            throw new Error('Invalid Username');
        }
    }
    catch(error){
        console.error(error);
        response.status(500).send(error.message);
    }
}

async function login(request, response)
{
    const username = request.body.username;
    const password = request.body.password;
    try{
        if(!hasWhiteSpace(username)){
            let user = await userControl.loginUser(username, password);
            console.log(user);
            response.status(200).json(user);
        }
        else{
            throw new Error('Invalid Username');
        }
    }
    catch(error){
        console.error(error);
        response.status(500).send(error.message);
    }
}


function hasWhiteSpace(str) {
    return /\s/g.test(str);
  }