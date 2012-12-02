define(["knockout", "jquery",


    "text!/tpl/tables.html",
    "text!/tpl/categories.html",
    "text!/tpl/menu.html",

    "view_models/TableViewModel",
    "view_models/CategoriesViewModel",
    "view_models/MenuViewModel"

	],function(ko, $, 

		tables_tpl, 
		categories_tpl, 
		menu_tpl, 

    	TableViewModel,
    	CategoriesViewModel,
		MenuViewModel) {
	return function(){
		var self = this;

		self.content = ko.observable(null), 
		self.currentPage = ko.observable('tables'),
	
		self.showTables = function(){			
			var self = this;
			self.currentPage('tables');
			$.get('/api/tables', function(data){
				self.content(
					{
						html : tables_tpl,
						data : new TableViewModel(data)
					}
				);
			});				
		};

		self.showCategories = function(){
			var self = this;
			self.currentPage('menu');
			$.get('/api/categories', function(data){
				self.content(
					{
						html : categories_tpl,
						data : new CategoriesViewModel(data)
					}
				);
			});			
		};

		self.showMenu = function(id){
			var self = this;
			self.currentPage('menu');
			$.get('/api/categories/' + id, function(data){
				data.category_id = id; 
				self.content(
					{
						html : menu_tpl,
						data : new MenuViewModel(data)
					}
				);
			})	
		};

	};
});		