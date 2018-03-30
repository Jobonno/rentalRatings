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
    var conflictUser = null;
    core.logic.users.userExists(req.body.email, req.body.username)
        .then((user) => {
            if (user != null) {
                res.status(409);
                res.send("User Already Exists!");
            } else {
                core.logic.users.saveUser(req.body.email, req.body.username, req.body.password)
                    .then((user) => {
                        res.status = 200;
                        res.json(user);
                    }).catch(err => {
                        console.log(err);
                        sendError(err,res);
                    })
            }

        })
}

module.exports.saveUser = function (email, username, password) {
    return new Promise(function (resolve, reject) {
        var newUser = new core.logic.databaseAccess.schemas.User();
        newUser.email = email;
        newUser.username = username;
        newUser.userId = newUser.id;
        newUser.password = core.bcrypt.hashSync(password, 10);
        newUser.save()
            .then(user => resolve(user))
            .catch(err => reject(err))
    })
}

module.exports.userExists = function (email, username) {
    return new Promise(function (resolve, reject) {
        core.logic.users.getUserByEmail(email)
            .then(
                (result) => {
                    if (result) resolve(result);
                }
            ).then(
                core.logic.users.getUserByUsername(username)
                    .then(
                        (result) => {
                            resolve(result);
                        }
                    )
            )
    })
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

module.exports.checkEmailAvailability = function (req, res) {
    return new Promise(function (resolve, reject) {
        core.logic.users.getUserByEmail(req.params.email)
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

module.exports.getUserByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        core.logic.databaseAccess.schemas.User.findOne({ 'email': email })
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

