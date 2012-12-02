
require.config({
    paths: {
        "jquery": "/libs/jquery-latest",
        "knockout": "/libs/knockout-min",
        "text": "/libs/text",
        "stringTemplateEngine": "/libs/stringTemplateEngine",
        "sammy" : "/libs/sammy-latest.min"
    },
    shim: {
        "stringTemplateEngine": ["knockout"]
    }
});

require([

	"knockout",
    "jquery",

    "app",

    "libs/enterKey",
    "stringTemplateEngine"

    ], function(ko, $, App, Sammy){
		$(function() {
			window.app = App;
			
			ko.applyBindings(app);

			app.run();
		});


	
});