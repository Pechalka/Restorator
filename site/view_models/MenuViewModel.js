define(["knockout", "jquery", "ko.mapping"],function(ko, $, mapping) {
	return function(model){
		var self = this;
		
		self.categories = ko.observableArray(model.categories);
		self.dishes = ko.observableArray(model.dishes);
		self.chosen_category = ko.observable(model.categories[0]);

		self.remove = function(item){
			self.dishes.remove(item);			
		}

		self.remove_dish = function(){
			if (self.dishes().length == 0) return;

			alert('remove_dish');
		};
	}
});		