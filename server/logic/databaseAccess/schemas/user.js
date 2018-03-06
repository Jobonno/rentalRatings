var core = require('../../../core/init.js');

const Schema = core.mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
const UserSchema = new Schema({
 userId: ObjectId,
 username: String,
 email: String
});

var User = core.mongoose.model('User', UserSchema);

module.exports.User = User;