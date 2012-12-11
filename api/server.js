var express = require('express');
var db = require('./database');
var app = express();

app.configure(function(){
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname + '/../site'));
});

db.connect();
app.on('close', function(error){
	db.disconnect();
});


app.get('/api/tables', function(req, res){	
	db.Table.find({}, function(err, data){
		res.json(200, data);		
	});
});

app.post('/api/reserve', function(req, res){	
	db.Table.findOne({ _id : req.body.id }, 
		function(err, data){
			data.free = false;
			data.save();

			res.json(200, 'ok');		
		}
	);
});

app.get('/api/categories', function(req, res){	
	db.Category.find({}, function(err, data){
		res.json(200, data);		
	});
});

app.get('/api/categories/:id', function(req, res){
	db.Category.findOne({ _id : req.params.id }, 
		function(err, category){
			res.json(200, category.dishes);		
		}
	);
});


app.post('/api/add_dish', function(req, res){
	db.Category.findOne({ _id : req.body.category_id }, 
		function(err, category){
			category.dishes.push(req.body);
			category.save();	

			res.json(200, req.body);					
		}
	);
});


app.post('/api/remove_dish', function(req, res){
	db.Category.findOne({ _id : req.body.category_id }, 
		function(err, category){
			var index = -1;
			for (var i = 0; i < category.dishes.length; i++) {
				if (category.dishes[i]._id == req.body.id){
					index = i;
					break;
				}
			};

			if (index != -1){
				category.dishes[index].remove();
				category.save();	
			}
			else{
				console.log('fuck you mongoose');
			}

			res.json(200, req.body);	
		}
	);
});

app.post('/api/remove_category', function(req, res){	
	db.Category.findOne({ name : req.body.name }, 
		function(err, item){
			item.remove()
			res.json(200, 'ok');		
		}
	);
});

app.get('/api/dishes', function(req, res){
	db.Dishes.find({}, function(err, items){
		res.json(200, items);	
	});
});


app.post('/api/dishes', function(req, res){
	new db.Dishes(req.body).save(function(){
		res.json(200, 'ok');
	});
});

app.post('/api/dishes_delete', function(req, res){
	db.Dishes.findOne({ _id : req.body._id }, 
		function(err, item){
			item.remove()
			res.json(200, 'ok');		
		}
	);
});


app.post('/api/add_category', function(req, res){		
	new db.Category(req.body).save(function(err, data){

		res.json(200, data);
	});
});


app.post('/api/remove_table', function(req, res){	
	db.Table.findOne({ _id : req.body.id }, 
		function(err, item){
			item.remove()
			res.json(200, 'ok');		
		}
	);
});

app.post('/api/add_table', function(req, res){	
	new db.Table(req.body).save(function(err, data){
		res.json(200, data);	
	});
});



app.listen(8080, function(){
	console.log("Express server listening on port %d", '8080');
});
