$(function() {

	function view_model(model){
		var self = this;

		self.categories = ko.observableArray(model);
		self.dishes = ko.observableArray(null);

		self.basket = ko.observableArray([]);


		self.price = ko.computed(function(){
			var sum = 0;
			

			ko.utils.arrayForEach(self.basket(), function(item){
				sum += parseInt(item.price, 10);
			});

			return sum;
		});

		self.add_item = function(item){
			self.basket.push($.extend({}, item));
		};

		self.remove_item = function(item){
			var p = ko.utils.arrayFirst(self.basket(), function(item) { return item._id == item._id; });
			self.basket.remove(p);
		}

		self.chosen_category = ko.observable(model[0].name);

		self.select_category = function(item){
			self.chosen_category(item.name);
			$.get('/api/dishes/' + self.chosen_category() + '/1', function(data){
				self.dishes(data.dishes);
			});
		};


	}


	$.get('/api/categories', function(data){
		var vm = new view_model(data);
		ko.applyBindings(vm);
	});	

});