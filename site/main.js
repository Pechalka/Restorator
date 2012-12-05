
require.config({
    paths: {
        "jquery": "/libs/jquery-latest",
        "knockout": "/libs/knockout-min",
        "ko.mapping" : "/libs/knockout.mapping",
        "text": "/libs/text",
        "stringTemplateEngine": "/libs/stringTemplateEngine",
        "sammy" : "/libs/sammy-latest.min"
    },
    shim: {
        "ko.mapping" : ["knockout"],
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