define(["knockout", "jquery", "ko.mapping", 	
	"text!/tpl/new_category.html", "/view_models/new_category.js",	
	"text!/tpl/edit_dish.html", "/view_models/edit_dish.js"]
	
,	function(ko, $, mapping, 		
	new_category_view, new_category_view_model,		
	edit_dish_view, edit_dish_view_model		) {
	
	return function(model){
		var self = this;
		
		self.categories = ko.observableArray(model.categories);
		self._dishes = ko.observableArray(model.dishes);
		self.chosen_category = ko.observable(model.categories[0]);

		self.dishes = ko.computed(function() {
			return ko.utils.arrayFilter(this._dishes(), function(item) {
				return item.category == self.chosen_category(); 				
			});
		}, self);

		self.popup = ko.observable(null);

		self.remove = function(item){
			self._dishes.remove(item);			
		}

		self.remove_dish = function(){
			if (self.dishes().length > 0) return;

			alert('remove_category');
		};

		self.add = function(){
			self.popup({
				data : new new_category_view_model(),
				html : new_category_view
			});
			$('#popup').modal('show');
		}

		self.edit_dishe = function(dishe) {
			self.popup({
				data : new edit_dish_view_model({
							categories : model.categories,
							dishe : dishe
						}),
				html : edit_dish_view
			});
			$('#popup').modal('show');

			return false;
		};
		
		self.add_dish = function(){
			self.popup({
				data : new edit_dish_view_model({ 
					categories : model.categories
				}),
				html : edit_dish_view
			});
			$('#popup').modal('show');	
		}


	}
});		