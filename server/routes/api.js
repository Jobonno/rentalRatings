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
    core.logic.schemas.User.find({}, function(err, users){
        if(err)console.log(err);
        else {
            response.data = users;
                    res.json(response);
        }
    })
});


core.router.post('/addUser', (req, res) => {
    var newUser = new core.logic.schemas.User();
    newUser.email = req.body.email;
    newUser.username = req.body.username;
    newUser.save(function(err){
       if(err)console.log(err);
       res.status = 200;
       res.send
    })
});

core.router.delete('/deleteUsers', (req, res) =>{
    var myquery = { name: /^F/ };
    core.database.connection((db) => {
        db.collection('users')
            .deleteMany(myquery, function (err, obj) {
                if (err) throw err;
                res.send(obj.result.n + " document(s) deleted");
            })
    });
})