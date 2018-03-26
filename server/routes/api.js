var core = require('../core/init.js');

// API location
core.app.use('/api', core.router);

//Admin API
core.app.use('/api/admin',  core.logic.authentication.tokenAuth, core.routerAdmin);

core.app.post('/authenticate', core.logic.authentication.authenticate);

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
core.router.get('/users', core.logic.users.getAllUsers);

core.router.post('/addUser', core.logic.users.addUser);

core.router.get('/validateUsername/:username', core.logic.users.checkUsernameAvailability);

core.router.get('/validateEmail/:email', core.logic.users.checkEmailAvailability);


// Admin Apis
core.routerAdmin.delete('/deleteUsers', core.logic.users.deleteAllUsers);



// Send all other requests to the Angular app
core.app.get('/*', (req,res)=>{
    res.sendFile(core.path.resolve('dist/index.html'))
});

