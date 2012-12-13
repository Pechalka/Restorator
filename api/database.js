var mongoose = require('mongoose');


mongoose.Model.paginate = function(q, pageNumber, resultsPerPage, callback){ //todo : create package
  var model = this;
  callback = callback || function(){};
  
  var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
  var query = model.find(q).skip(skipFrom).limit(resultsPerPage);

  query.exec(function(error, results) {
    if (error) {
      callback(error, null, null);
    } else {
      model.count(q, function(error, count) {
        if (error) {
          callback(error, null, null);
        } else {
          var pageCount = Math.ceil(count / resultsPerPage);
          if (pageCount == 0) // fix : 1 of 0
          	pageCount = 1;
          callback(null, pageCount, results);
        }
      });
    }
  });
}


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


