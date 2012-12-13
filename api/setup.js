var db = require('./database');
var async = require('async');

 var actions = [];



var dishes = [
		{ name : '"Ницца" с тунцом и анчоусами', category : 'Холодные закуски', price : 120 , description : 'bla bla bla bla bla bla '}, 
		{ name : '"Цезарь" с тигровыми креветками', category : 'Холодные закуски' , price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Легкий Норвежский салат из лосося с авокадо', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : '"Цезарь" классический', category : 'Десерты', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Пикантный салатик с ломтиками телятины в кунжуте', category : 'Десерты', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Теплый салат с индейкой, красным виноградом и веточкой розмарина', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с грецкими орехами, карамелизированной грушей и сыром пекорино', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с белыми грибами и proscuitto di Parmа', category : 'Десерты', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с proscuitto di Parmа, черешней и мятой', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
	
	//todo : добавить больше тестовых данных нормальных
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '}
	
	];


 var categories = [
 	{ name : "Холодные закуски"},
     { name :    "Салаты"},
     { name :    "Горячие закуски"},
     { name :    "Мясные блюда"},
     { name :    "Гарниры"},
     { name :    "Горячие блюда из  рыбы"},
     { name :    "Десерты"},
     { name :    "Мороженое"},
 	{ name :	"Фрукты"}
 	];

for (var i = 0; i < dishes.length; i++) {	
	var insert = function(data){ //замыкание, если сделать по простому i = 10 
		return function(cb){
			console.log(data);
			var dish = new db.Dishes(data);
			dish.save(cb);
		}
	}(dishes[i]);	

	actions.push(insert);
}


for (var i = 0; i < categories.length; i++) {
	var inser = function(data){ 
		return function(cb){  
			console.log(data);
			var category = new db.Category(data);
			category.save(cb);
		}
	}(categories[i]);	
	actions.push(inser);
};

//todo: разобратся с async, найти че небудь для миграция (стопудова можно сделать проще)
async.waterfall([
	function(cb){
		db.connect();
		 cb(null, 'connect');
    },
    function(d, cb){
    	db.Dishes.remove({}, cb); //remove all
    },
    function(d, cb){
        db.Category.remove({}, cb); //remove all
    },
    function(d, cb){
		async.series(
				actions,
				function(){
					cb();
				}
			);
    }
], function (err, result) {
	db.disconnect();
});