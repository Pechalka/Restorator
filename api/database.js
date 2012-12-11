var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TableSchema = new Schema({
	name : String,
	free : { type : Boolean, default : true }
});

var DishSchema =  new Schema({
	name : String,
	price : String,
	description : String,
	category : String
});

var CategorySchema = new Schema({
	name : String,
	dishes : [DishSchema]
});


exports.Table = mongoose.model('Tables', TableSchema);
exports.Category = mongoose.model('Categories', CategorySchema);
exports.Dishes = mongoose.model('dishes', DishSchema);


exports.connect = function() {
	mongoose.connect('mongodb://localhost/Restoran');
} 

exports.disconnect = function() {
	mongoose.disconnect(function(err){});
}