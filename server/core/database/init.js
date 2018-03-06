var core = require('../init.js');

// module.exports.MongoClient = require('mongodb').MongoClient;
// module.exports.ObjectID = require('mongodb').ObjectID;

// // Connect
// module.exports.connection = (closure) => {
//     return module.exports.MongoClient.connect('mongodb://localhost:27017/rentalRatings', (err, client) => {
//         if (err) return console.log(err);

//         let db = client.db('rentalRatings');
//         closure(db);
//     });
// };


module.exports.mongoose = core.mongoose.connect('mongodb://localhost:27017/rentalRatings');