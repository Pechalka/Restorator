$(function() {

	var ENTER_KEY = 13;

	// a custom binding to handle the enter key (could go in a separate library)
	ko.bindingHandlers.enterKey = {
		init: function( element, valueAccessor, allBindingsAccessor, data ) {
			var wrappedHandler, newValueAccessor;

			// wrap the handler with a check for the enter key
			wrappedHandler = function( data, event ) {
				if ( event.keyCode === ENTER_KEY ) {
					valueAccessor().call( this, data, event );
				}
			};

			// create a valueAccessor with the options that we would want to pass to the event binding
			newValueAccessor = function() {
				return {
					keyup: wrappedHandler
				};
			};

			// call the real event binding's init function
			ko.bindingHandlers.event.init( element, newValueAccessor, allBindingsAccessor, data );
		}
	};


	function TableViewModel(model){
		var self = this;
		self.tables = ko.observableArray(model);

		self.newTable = ko.observable('');


		self.remove = function(item){
			$.post('/api/remove_table', { id : item._id }, function(){
				self.tables.remove(item);	
			});				
		}

		self.add = function(){
			if (self.newTable() == ''){
				alert('введите название столика, блять!');
				return;
			}

			$.post('/api/add_table', { name : self.newTable()}, 
			function(newItem){
				self.tables.push(newItem);
				self.newTable('');
			});
		};
	};


	function CategoriesViewModel(model){
		var self = this;
		self.category = ko.observableArray(model);
		
		self.newItem = ko.observable('');
		
		self.remove = function(item){
			$.post('/api/remove_category', { id : item._id }, function(){
				self.category.remove(item);	
			});
		}

		self.add = function(){
			if (self.newItem() == ''){
				alert('введите название категории, блять!');
				return;
			}

			$.post('/api/add_category', { name : self.newItem()}, 
			function(newItem){
				self.category.push(newItem);
				self.newItem('');
			});
		}

		self.edit = function(item){
			window.app.showMenu(item._id);
		};
	};

	function MenuViewModel(model){
		var self = this;
		self.dishes = ko.observableArray(model);
		self.newItem = ko.observable('');
		self.category_id = model.category_id;

		self.add = function(){
			if (self.newItem() == ''){
				alert('введите название блюда, блять!');
				return;
			}

			$.post(
				'/api/add_dish', 
				{ 
					category_id : self.category_id, 
					name :  self.newItem(), 
					price : '10$'
				}, 
				function(newItem){
					self.dishes.push(newItem);
					self.newItem('');
				}
			);
		}

		self.remove = function(item){
			$.post(
				'/api/remove_dish', 
				{ 
					category_id : self.category_id, 
					id :  item._id
				}, 
				function(){
					self.dishes.remove(item);
				}
			);
		}
	}


	window.app = {
		tables : ko.observable(null),
		menu : ko.observable(null),
		categories : ko.observable(null),
		currentPage : ko.observable('tables'),
		showTables : function(){
			var self = this;
			$.get('/api/tables', function(data){
				self.tables(new TableViewModel(data));
				self.categories(null);
				self.menu(null);
				self.currentPage('tables');
			});				
		},
		showCategories : function(){
			var self = this;
			$.get('/api/categories', function(data){
				self.tables(null);
				self.categories(new CategoriesViewModel(data));
				self.menu(null);
				self.currentPage('menu');
			});			
		},		
		showMenu : function(id){
			var self = this;
			self.tables(null);
			self.categories(null);
			
			self.currentPage('menu');
			$.get('/api/categories/' + id, function(data){
				data.category_id = id; 
				self.menu(new MenuViewModel(data));
			})	
		}
	};
	
	ko.applyBindings(app);

	app.showTables();


});