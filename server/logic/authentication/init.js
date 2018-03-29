var core = require('../../core/init');

module.exports.authenticate = function (req, res) {
    core.logic.users.getUserByUsername(req.body.username)
        .then(
            user => {
                if (!user) {
                    res.json({ success: false, message: 'Authentication failed. User not found.' });
                } else if (user) {
                    if (!core.bcrypt.compareSync(req.body.password, user.password)) {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } else {
                        // if user is found and password is right
                        // create a token with only our given payload
                        // we don't want to pass in the entire user since that has the password
                        const payload = {
                            username: user.username,
                            email: user.email
                        };
                        var token = core.jwt.sign(payload, core.credentials.jwtSecret, {
                            expiresIn: 1440 // expires in 24 hours
                        });

                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                }
            }
        )
}

module.exports.tokenAuth = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        core.jwt.verify(token, core.credentials.jwtSecret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}