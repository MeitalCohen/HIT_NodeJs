const express = require('express');
const bodyParser = require('body-parser');
const mongooseModule = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(cors());

const mongoDB = 'mongodb+srv://adminUser:password1234@cluster0.ucml3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongooseModule.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongooseModule.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./api/usersApi')(app);
require('./api/userCostApi')(app);

app.listen(3004);