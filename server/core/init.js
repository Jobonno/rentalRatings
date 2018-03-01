module.exports.express = require('express');
module.exports.bodyParser = require('body-parser');
module.exports.path = require('path');
module.exports.http = require('http');
module.exports.app = module.exports.express();
module.exports.router = module.exports.express.Router();
// API file for interacting with MongoDB
module.exports.api = require('../routes/api');

// Parsers
module.exports.app.use(module.exports.bodyParser.json());
module.exports.app.use(module.exports.bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
module.exports.app.use(module.exports.express.static(module.exports.path.join(__dirname, '../../dist')));


module.exports.database = require('./database/init.js');