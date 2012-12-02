define(["knockout", "jquery"],function(ko, $) {
	return function(model){
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
});		