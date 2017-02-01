/**
 * Created by Puneeth Thimmoji Somasekhara on 1/28/17.
 */
// This is starting of our app

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

//Mongo Set up
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/auth');

//App set up
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
routes(app);

//server setting goes here
const port = process.env.PORT || 3000;
app.listen(port);
console.log("App listening at PORT:", port);