const userCostsControl = require('../control/userCostsControl');

module.exports = function (app) {

    app.get('/userCosts/categories', getCategories);
    app.get('/userCosts/user', getUserCosts);
    app.post('/userCosts/add', addUserCost);
    app.post('/userCosts/update', updateUserCost);
    app.delete('/userCosts', deleteUserCost);
};


async function getCategories(request, response)
{
    try{
        const costsCategories = ['Food','Health', 'Sport', 'Education', 'Housing', 'Other'];
        response.status(200).send(costsCategories);
    }
    catch(error){
        console.error(error);
        response.status(500).send(false);
    }
}

async function getUserCosts(request, response)
{
    const username = request.query.username;
    const category = request.query.category;
    const startDateRange = request.query.from;
    const endtDateRange = request.query.to;
    try{
        let newUserCost = await userCostsControl.searchUserCosts(username, category, startDateRange, endtDateRange);
        console.log(newUserCost);
        response.status(200).send(newUserCost);
    }
    catch(error){
        console.error(error);
        response.status(500).send(false);
    }
}


async function addUserCost(request, response)
{
    const userCost = request.body.userCost;
    try{
        let newUserCost = await userCostsControl.saveUserCosts(userCost);
        response.status(201).send(newUserCost);
    }
    catch(error){
        console.error(error);
        response.status(500).send(false);
    }
}

async function updateUserCost(request, response)
{
    const userCost = request.body.userCost;
    try{
        let updatedUserCost = await userCostsControl.updateUserCosts(userCost);
        response.status(200).send({'Message' : 'Updated successfully'});
    }
    catch(error){
        console.error(error);
        response.status(500).send(false);
    }
}

async function deleteUserCost(request, response)
{
    const userCostId = request.query.id;
    try{
        await userCostsControl.deleteUsersCosts(userCostId);
        response.status(200).send({'Message' : `Deleted successfully ${userCostId}`});
    }
    catch(error){
        console.error(error);
        response.status(500).send(false);
    }
}