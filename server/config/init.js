var core = require('../core/init.js');
module.exports.port = process.env.PORT || '3000';
core.app.set('port', module.exports.port);

module.exports.server = core.http.createServer(core.app);