const mongoose = require('mongoose');

const FishSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	age: {
		type: String,
		required: true,
	},
	dob: {
		type: Date,
		required: true,
	},
	imageFile: {
		type: String,
	},
	userId: {
		type: String,
		required: true,
	},
});

module.exports = Fish = mongoose.model('fish', FishSchema);
