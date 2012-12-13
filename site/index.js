$(function() {

	function view_model(model){
		var self = this;

		self.categories = ko.observableArray(model);
		self.dishes = ko.observableArray(null);

		self.basket = {};
		//ko.observable(null);
		//ko.observableArray([]);


		self.price = ko.computed(function(){
			var sum = 0;
			

			// ko.utils.arrayForEach(self.basket(), function(item){
			// 	sum += parseInt(item.price, 10);
			// });

			for(var key in self.basket)
			{
				sum += parseInt(self.basket[key]() * item.price, 10);
			}

			return sum;
		});

		self.add_item = function(item){
			if (self.basket[item.Id])
				self.basket[item.Id](self.basket[item.Id]() + 1);
			else	
				self.basket[item.Id] = ko.observable(0);
		};

		self.remove_item = function(item){
			self.basket[item.Id](self.basket[item.Id] - 1);

//			self.basket.remove(item);
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