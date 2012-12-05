define(["knockout", "jquery",


    "text!/tpl/tables.html",
    "text!/tpl/menu.html",

    "view_models/TableViewModel",
    "view_models/MenuViewModel",

    "sammy"

	],function(ko, $, 

		tables_tpl, 
		menu_tpl, 

    	TableViewModel,
		MenuViewModel,


		Sammy) {
		
	return Sammy(function(){
		var app = this;

		app.content = ko.observable(null), 
		app.currentPage = ko.observable('tables'),

        this.get('admin.html#tables', function () {
        	app.currentPage('tables');
			$.get('/api/tables', function(data){
				app.content(
					{
						html : tables_tpl,
						data : new TableViewModel(data)
					}
				);
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
					{ name : '"Ницца" с тунцом и анчоусами'}, 
					{ name : '"Цезарь" с тигровыми креветками'},
					{ name : 'Легкий Норвежский салат из лосося с авокадо'},
					{ name : '"Цезарь" классический'},
					{ name : 'Пикантный салатик с ломтиками телятины в кунжуте'},
					{ name : 'Теплый салат с индейкой, красным виноградом и веточкой розмарина'},
					{ name : 'Салат с грецкими орехами, карамелизированной грушей и сыром пекорино'},
					{ name : 'Салат с белыми грибами и proscuitto di Parmа'},
					{ name : 'Салат с proscuitto di Parmа, черешней и мятой'},
					{ name : 'Салат с медальонами из свинины в пряной глазури'}
				]
			};


        	app.content({
        		html : menu_tpl,
        		data : new MenuViewModel(model)
        	});
        });


        this.get('admin.html', function () {
        	window.location = 'admin.html#tables';
        });

	});
});		