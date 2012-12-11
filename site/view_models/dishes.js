define(["knockout", "jquery", "ko.mapping", "render"]
	
,	function(ko, $, mapping, render) {
	
	return function(){
		var self = this;
		
		self.categories = ko.observableArray([]);
		self.dishes = ko.observableArray([]);
		self.chosen_category = ko.observable("");
		self.popup = ko.observable(null);

		self.fetch_categories = function(){
			$.get('/api/categories', self.categories);
		}

		self.update_count = ko.observable(0);
		self.fetch_dishes = ko.computed(function(){	
			self.update_count();//первый жесткий костыль, пора спать:)

			if (self.chosen_category())//todo: разобратся с deferred, и использовать ее для первой загрузки, посмотреть knockoutjs peek
				$.get('/api/dishes/' + self.chosen_category().name, self.dishes);

		}, self);


		self.remove = function(item){
			$.post('/api/dishes_delete', item, function(){
				self.dishes.remove(item);
			});			
		}

		self.remove_category = function(){
			if (self.can_delete_category()) {
				$.post('/api/remove_category', { name : self.chosen_category().name }, self.fetch_categories);
			}
		};


		self.can_delete_category = ko.computed(function(){
			return this.categories().length > 0 && this.dishes().length == 0;
		}, self);


		self.add = function(){
			render(self.popup, "new_category", {
				on_save : function(){
					self.fetch_categories();
					$('#popup').modal('hide');
				}
			});
			$('#popup').modal('show');
		}

		self.edit_dishe = function(dishe) {
			render(self.popup, "edit_dish", {
				categories : self.categories,
				dishe : dishe,
				on_save : function(){
					self.update_count(self.update_count() + 1)
					$('#popup').modal('hide');
				}
			});
			$('#popup').modal('show');
		};


		self.can_add_dish = ko.computed(function(){
			return this.categories().length > 0 ;
		}, self);

		self.add_dish = function(){
			if (self.can_add_dish()) {
				render(self.popup, "edit_dish", {
					categories : self.categories,
					on_save : function(){
						self.update_count(self.update_count() + 1)
						$('#popup').modal('hide');
					}
				});
				$('#popup').modal('show');
			}
		}

		self.fetch_categories();
	}
});		