var core = require('../init.js');

module.exports.mongoose = core.mongoose.connect('mongodb://localhost:27017/rentalRatings', core.credentials.mongodbAuth);
