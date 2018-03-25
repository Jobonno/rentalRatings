var core = require('../../../core/init.js');

const Schema = core.mongoose.Schema,
    ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: { type: String, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'] },
    email: { type: String, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'] },
    password: String
}, { timestamps: true });

var User = core.mongoose.model('User', UserSchema);

module.exports.User = User;

