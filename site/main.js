
require.config({
    paths: {
        "jquery": "libs/jquery-latest",
        "knockout": "libs/knockout-min",
        "ko.mapping" : "libs/knockout.mapping",
        "text": "libs/text",
        "stringTemplateEngine": "libs/stringTemplateEngine",
        "sammy" : "libs/sammy-latest.min",
        "bootstrap" : "bootstrap/js/bootstrap.min",
        "render" : "core/render"
    },
    shim: {
        "ko.mapping" : ["knockout"],
        "stringTemplateEngine": ["knockout"],
        "bootstrap" : ["jquery"]
    }
});

require([

	"knockout",
    "jquery",

    "app",

    "libs/enterKey",
    "stringTemplateEngine",

    "bootstrap"

    ], function(ko, $, App, Sammy){
		$(function() {
			window.app = App;
			
			ko.applyBindings(app);

			app.run();
		});


	
});