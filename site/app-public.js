define(["knockout", "jquery",

	"render",

    "sammy"

	],function(ko, $, 

		render,


		Sammy) {
		
	return Sammy(function(){ //TODO : make one app!!
		var app = this;

		app.content = ko.observable(null);

		// create model
		app.basket = ko.observableArray([]);


		this.get('#order', function() {
			$.get('/api/tables', function(tables) {
        		render(app.content, "public/order", {
        			tables : tables,
        			basket : app.basket
        		});
			});

        });

        this.get('index.html', function () {
        	window.location = '';
        });


        this.get('', function () {               
			$.get('/api/categories', function(data){
				data.basket = app.basket;
				render(app.content, "public/menu", data);
			});
        });

        
	});
});		