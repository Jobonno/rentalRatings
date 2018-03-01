var core = require('../core/init.js');

// API location
core.app.use('/api', core.router);

// Send all other requests to the Angular app
core.app.get('/', (req, res) => {
    res.sendFile(core.path.resolve('dist/index.html'));
});

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

// Get users
core.router.get('/users', (req, res) => {
    core.database.connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});
