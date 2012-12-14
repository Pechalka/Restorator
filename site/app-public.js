define(["knockout", "jquery",

	"render",

    "sammy"

	],function(ko, $, 

		render,


		Sammy) {
		
	return Sammy(function(){ //TODO : make one app!!
		var app = this;

		app.content = ko.observable(null);

        this.get('index.html', function () {
        	window.location = '';
        });


        this.get('', function () {               
			$.get('/api/categories', function(data){
				render(app.content, "public/menu", data);
			});
        });
	});
});		