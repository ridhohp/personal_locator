var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/data');

var UserSchema = new Schema({
	username : {type : String, required: true, unique : true},
	password : String,
	email : String
	});

var User = mongoose.model('User',UserSchema);
module.exports = User;