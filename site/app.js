define(["knockout", "jquery",

	"render",

    "sammy"

,"text!views/tables.html", "view_models/tables.js"


,"text!views/dishes.html", "view_models/dishes.js"

	],function(ko, $, 

		render,


		Sammy

,tablesHtml, tablesViewModel

,dishesHtml, dishesViewModel

		) {
		
	return Sammy(function(){
		var app = this;

		app.content = ko.observable(null), 
		app.currentPage = ko.observable('tables'),

        this.get('admin.html#tables', function () {
        	app.currentPage('tables');
			$.get('/api/tables', function(data){
				//render(app.content, "tables", data);


					app.content({
						data : new tablesViewModel(data),
						html : tablesHtml
					});


			});
        });


        this.get('admin.html#menu', function(){
			app.currentPage('menu');

	
		//	render(app.content, "dishes");

					app.content({
						data : new dishesViewModel({}),
						html : dishesHtml
					});

        });


        this.get('admin.html', function () {
        	window.location = 'admin.html#tables';
        });

	});
});		