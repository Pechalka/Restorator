define(["knockout", "jquery"],function(ko, $) {
	return	function(model){
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
});	