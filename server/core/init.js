module.exports.express = require('express');
module.exports.bodyParser = require('body-parser');
module.exports.path = require('path');
module.exports.http = require('http');
module.exports.app = module.exports.express();
module.exports.router = module.exports.express.Router();
// Parsers
module.exports.app.use(module.exports.bodyParser.json());
module.exports.app.use(module.exports.bodyParser.urlencoded({ extended: true}));

//Api Routes
module.exports.api = require('../routes/api');


// Angular DIST output folder
module.exports.app.use(module.exports.express.static(module.exports.path.join(__dirname, '../../dist')));

//MongoDB and Mongoose
module.exports.mongoose = require('mongoose');
module.exports.database = require('./database/init.js');



module.exports.logic = require('../logic/init.js');