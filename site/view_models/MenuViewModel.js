define(["knockout", "jquery", "ko.mapping", 	
	"text!/tpl/new_category.html", "/view_models/new_category.js",	
	"text!/tpl/edit_dish.html", "/view_models/edit_dish.js"]
	
,	function(ko, $, mapping, 		
	new_category_view, new_category_view_model,		
	edit_dish_view, edit_dish_view_model		) {
	
	return function(model){
		var self = this;
		
		self.categories = ko.observableArray(model.categories);
		self.dishes = ko.observableArray(model.dishes);
		self.chosen_category = ko.observable(model.categories[0]);

		self.popup = ko.observable(null);

		self.remove = function(item){
			self.dishes.remove(item);			
		}

		self.remove_dish = function(){
			if (self.dishes().length == 0) return;

			alert('remove_dish');
		};

		self.add = function(){
			self.popup({
				data : new new_category_view_model(),
				html : new_category_view
			});
			$('#popup').modal('show');
		}

		self.add_dish = function(){
			self.popup({
				data : new edit_dish_view_model(model.categories),
				html : edit_dish_view
			});
			$('#popup').modal('show');	
		}


	}
});		