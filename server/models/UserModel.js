const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name Required"],
		trim: true,
		minlength : 5
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		required: [true, "Email Required"]
	},
	password: {
		type: String,
		required: [true, "Password Required"]
	},
	avatar: {
		type: String,
		default : ''
	},
	subscribers : [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
}, {
	timestamps: true,
	versionKey: false
});

UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })

module.exports = mongoose.model('User', UserSchema);