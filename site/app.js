define(["knockout", "jquery",

	"render",

    "sammy"

	],function(ko, $, 

		render,


		Sammy) {
		
	return Sammy(function(){
		var app = this;

		app.content = ko.observable(null), 
		app.currentPage = ko.observable('tables'),

        this.get('admin.html#tables', function () {
        	app.currentPage('tables');
			$.get('/api/tables', function(data){
				render(app.content, "tables", data);
			});
        });


        this.get('admin.html#menu', function(){
			app.currentPage('menu');

			var model = {
				categories : [
					"Холодные закуски",
	                "Салаты",
	                "Горячие закуски",
	                "Мясные блюда",
	                "Гарниры",
	                "Горячие блюда из  рыбы",
	                "Десерты",
	                "Мороженое",
					"Фрукты"
				],
				dishes : [
					{ name : '"Ницца" с тунцом и анчоусами', category : 'Холодные закуски', price : 120 , description : 'bla bla bla bla bla bla '}, 
					{ name : '"Цезарь" с тигровыми креветками', category : 'Холодные закуски' , price : 120, description : 'bla bla bla bla bla bla '},
					{ name : 'Легкий Норвежский салат из лосося с авокадо', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
					{ name : '"Цезарь" классический', category : 'Десерты', price : 120, description : 'bla bla bla bla bla bla '},
					{ name : 'Пикантный салатик с ломтиками телятины в кунжуте', category : 'Десерты', price : 120, description : 'bla bla bla bla bla bla '},
					{ name : 'Теплый салат с индейкой, красным виноградом и веточкой розмарина', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
					{ name : 'Салат с грецкими орехами, карамелизированной грушей и сыром пекорино', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
					{ name : 'Салат с белыми грибами и proscuitto di Parmа', category : 'Десерты', price : 120, description : 'bla bla bla bla bla bla '},
					{ name : 'Салат с proscuitto di Parmа, черешней и мятой', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
					{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '}
				]
			};

			render(app.content, "dishes", model);
        });


        this.get('admin.html', function () {
        	window.location = 'admin.html#tables';
        });

	});
});		