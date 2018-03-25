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
    newUser.userId = newUser.id;
    newUser.password = core.bcrypt.hashSync(req.body.password, 10);
    newUser.save()
        .then(() => {
            res.status = 200;
            res.send();
        }).catch(err => console.log(err))
}


module.exports.checkUsernameAvailability = function (req, res) {
    return new Promise(function (resolve, reject) {
        core.logic.users.getUserByUsername(req.params.username)
            .then((result) => {
                if (result)
                    res.send({ available: false });
                else
                    res.send({ available: true })
            })
            .catch(err => console.log(err))
    })
}

module.exports.getAllUsers = function (req, res) {
    core.logic.databaseAccess.schemas.User.find({})
        .then(
            (users) => {
                response.data = users
                res.json(response);
            }
        ).catch(err => console.log(err));
}


module.exports.getUserByUsername = function (username) {
    return new Promise(function (resolve, reject) {
        core.logic.databaseAccess.schemas.User.findOne({ 'username': username })
            .then(
                user => {
                    resolve(user);
                }
            )
            .catch(err => reject(err)
            )
    })

}


module.exports.deleteAllUsers = function (req, res) {
    core.logic.databaseAccess.schemas.User.remove({})
        .then(() => {
            res.status = 200;
            res.send();
        })
        .catch(err => console.log(err))
}

