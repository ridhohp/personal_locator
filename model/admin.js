var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/data');

var DataSchema = new mongoose.Schema({
	nama: String,
	status: String,
	mac: String,

	update_at:{type : Date, default:Date.now},
});


module.exports = mongoose.model('data', DataSchema);