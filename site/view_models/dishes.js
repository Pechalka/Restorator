define(["knockout", "jquery", "ko.mapping", "render"]
	
,	function(ko, $, mapping, render) {
	
	return function(model){
		var self = this;
		
		self.categories = ko.observableArray(model.categories);
		self._dishes = mapping.fromJS(model.dishes);
		self.chosen_category = ko.observable(model.categories[0]);

		self.dishes = ko.computed(function() {
			return ko.utils.arrayFilter(this._dishes(), function(item) {
				return item.category() == self.chosen_category(); 				
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
			render(self.popup, "new_category");
			$('#popup').modal('show');
		}

		self.edit_dishe = function(dishe) {
			render(self.popup, "edit_dish", {
				categories : model.categories,
				dishe : dishe,
				dishes : self._dishes
			});
			$('#popup').modal('show');

			return false;
		};

		self.add_dish = function(){
			render(self.popup, "edit_dish", {
				categories : model.categories
			});
			$('#popup').modal('show');	
		}


	}
});		