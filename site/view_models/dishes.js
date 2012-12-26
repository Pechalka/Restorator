define(["knockout", "jquery", "ko.mapping", "render", "text!views/new_category.html", "view_models/new_category.js"]
	
,	function(ko, $, mapping, render,

NewCategoryHtml,
NewCategoryViewMode

	) {
	
	return function(){
		var self = this;
		
		self.categories = ko.observableArray([]);
		self.dishes = ko.observableArray([]);
		self.chosen_category = ko.observable("");
		self.popup = ko.observable(null);

		self.paging = {
	        PageNumber: ko.observable(1),
	        TotalPagesCount: ko.observable(10),
	        can_next : function(){
	        	return this.PageNumber() < this.TotalPagesCount();
	        },
	        next: function () {
	            if (this.can_next()) 
	            	this.PageNumber(this.PageNumber() + 1);
	        },
	        can_back : function(){
	        	return this.PageNumber() > 1;
	        },
	        back: function () {
	            if (this.can_back()) 
	            	this.PageNumber(this.PageNumber() - 1);
	        }
	    };


		self.fetch_categories = function(){
			$.get('/api/categories', self.categories);
		}

		self.fetch_dishes = function(){	
			if (!self.chosen_category()) return;

			$.get('/api/dishes/' + self.chosen_category() + "/" + self.paging.PageNumber(), function(data){
				self.dishes(data.dishes);
				self.paging.TotalPagesCount(data.total_pages_count);
			});
		}


		self.remove_category = function(){
			if (self.can_delete_category()) {
				$.post('/api/remove_category', { name : self.chosen_category() }, self.fetch_categories);
			}
		};


		self.can_delete_category = ko.computed(function(){
			return this.categories().length > 0 && this.dishes().length == 0;
		}, self);


		self.add_category = function(){
			// render(self.popup, "new_category", {
			// 	on_save : function(){
			// 		self.fetch_categories();
			// 		$('#popup').modal('hide');
			// 	}
			// });

			var model = {
				on_save : function(){
					self.fetch_categories();
					$('#popup').modal('hide');
				}
			};

			self.popup({
					data : new NewCategoryViewMode(model),
					html : NewCategoryHtml
				});

			$('#popup').modal('show');
		}

		self.edit_dishe = function(dishe) {
			render(self.popup, "edit_dish", {
				categories : self.categories,
				dishe : dishe,
				on_save : function(){
					self.fetch_dishes();
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
					dishe : { category : self.chosen_category(), price : 0, name : '', description : '' },
					on_save : function(){
						self.fetch_dishes();
						$('#popup').modal('hide');
					}
				});
				$('#popup').modal('show');
			}
		}

		self.remove_dish = function(item){
			$.post('/api/dishes_delete', item, function(){
				if (self.dishes().length == 1  && self.paging.PageNumber() != 1)
					self.paging.PageNumber(self.paging.TotalPagesCount() - 1);
				else
					self.fetch_dishes();
			});			
		}

		self.paging.PageNumber.subscribe(self.fetch_dishes);
		self.chosen_category.subscribe(function(){
			self.paging.PageNumber(1);
			self.fetch_dishes();
		});

		self.fetch_categories();

		//ko.computed(self.fetch_dishes, self);
	}
});		