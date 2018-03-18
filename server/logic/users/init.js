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
    core.logic.users.getUserByUsername(req.body.username, function (result) {
        if (result) {
            sendError("User already Exists", res);
        } else {
            newUser.password = core.bcrypt.hashSync(req.body.password, 10);
            newUser.save(function (err) {
                if (err) console.log(err);
                res.status = 200;
                res.send();
            });
        }
    })

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

module.exports.getUserByUsername = function (username, next) {
    core.logic.databaseAccess.schemas.User.findOne({ 'username': username }, function (err, user) {
        if (err) console.log(err);
        else {
            next(user);
        }
    })
}

module.exports.deleteAllUsers = function (req, res) {
    core.logic.databaseAccess.schemas.User.remove({}, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.status = 200;
            res.send();
        }
    });
}