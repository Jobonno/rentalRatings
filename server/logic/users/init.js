var core = require('../../core/init.js');

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

module.exports.addUser = function (req, res) {
    var newUser = new core.logic.databaseAccess.schemas.User();
    newUser.email = req.body.email;
    newUser.username = req.body.username;
    newUser.save(function (err) {
        if (err) console.log(err);
        res.status = 200;
        res.send();
    });
}


module.exports.getAllUsers = function (req, res) {
    core.logic.databaseAccess.schemas.User.find({}, function (err, users) {
        if (err) console.log(err);
        else {
            response.data = users;
            res.json(response);
        }
    })
}