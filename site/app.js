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

	
			render(app.content, "dishes");
        });


        this.get('admin.html', function () {
        	window.location = 'admin.html#tables';
        });

	});
});		