
require.config({
    paths: {
        "jquery": "/libs/jquery-latest",
        "knockout": "/libs/knockout-min",
        "text": "/libs/text",
        "stringTemplateEngine": "/libs/stringTemplateEngine"
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

    ], function(ko, $, App){
		$(function() {
			window.app = new App();
			ko.applyBindings(app);
			app.showTables();
		});
});