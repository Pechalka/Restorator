var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.configure(function(){
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname + '/../site'));
});



var Schema = mongoose.Schema;
var TableSchema = new Schema({
	name : String,
	free : { type : Boolean, default : true }
});

var CategorySchema = new Schema({
	name : String
});


var Table = mongoose.model('Tables', TableSchema);
var Category = mongoose.model('Categories', TableSchema);

mongoose.connect('mongodb://localhost/Restoran');

app.on('close', function(error){
	mongoose.disconnect();
});



app.get('/api/test', function(req, res){	
	res.json(200, { test : 'test'})
});


app.get('/api/tables', function(req, res){	
	Table.find({}, function(err, data){
		res.json(200, data);		
	});
});

app.post('/api/reserve', function(req, res){	
	Table.findOne({ _id : req.body.id }, 
		function(err, data){
			data.free = false;
			data.save();

			res.json(200, 'ok');		
		}
	);
});

app.get('/api/categories', function(req, res){	
	Category.find({}, function(err, data){
		res.json(200, data);		
	});
});


app.post('/api/remove_category', function(req, res){	
	Category.findOne({ _id : req.body.id }, 
		function(err, item){
			item.remove()
			res.json(200, 'ok');		
		}
	);
});

app.post('/api/add_category', function(req, res){	
	var с = new Category(req.body);
	с.save(function(err, data){
		res.json(200, data);	
	});
});


app.post('/api/remove_table', function(req, res){	
	Table.findOne({ _id : req.body.id }, 
		function(err, item){
			item.remove()
			res.json(200, 'ok');		
		}
	);
});

app.post('/api/add_table', function(req, res){	
	var t = new Table(req.body);
	t.save(function(err, data){
		res.json(200, data);	
	});
});



app.listen(8080, function(){
	console.log("Express server listening on port %d", '8080');
});
