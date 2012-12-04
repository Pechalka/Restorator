define(["knockout", "jquery",


    "text!/tpl/tables.html",
    "text!/tpl/categories.html",
    "text!/tpl/menu.html",

    "view_models/TableViewModel",
    "view_models/CategoriesViewModel",
    "view_models/MenuViewModel",

    "sammy"

	],function(ko, $, 

		tables_tpl, 
		categories_tpl, 
		menu_tpl, 

    	TableViewModel,
    	CategoriesViewModel,
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

        this.get('admin.html#categories', function () {
        	app.currentPage('menu');
			$.get('/api/categories', function(data){
				app.content(
					{
						html : categories_tpl,
						data : new CategoriesViewModel(data)
					}
				);
			});	
        });
        this.get('admin.html#menu/:id', function () {
        	var id = this.params.id;
        	app.currentPage('menu');
			$.get('/api/categories/' + id, function(data){
				data.category_id = id; 
				app.content(
					{
						html : menu_tpl,
						data : new MenuViewModel(data)
					}
				);
			})	
        });

        this.get('admin.html', function () {
        	window.location = 'admin.html#tables';
        });

	});
});		