var core = require('./server/config/init.js');
core.server.listen(core.port, () => console.log(`Running on localhost:${core.port}`));

