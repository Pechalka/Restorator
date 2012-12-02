define(["knockout", "jquery"],function(ko, $) {
	 return function (model){
			var self = this;
			self.tables = ko.observableArray(model);

			self.newTable = ko.observable('');


			self.remove = function(item){
				$.post('/api/remove_table', { id : item._id }, function(){
					self.tables.remove(item);	
				});				
			}

			self.add = function(){
				if (self.newTable() == ''){
					alert('введите название столика, блять!');
					return;
				}

				$.post('/api/add_table', { name : self.newTable()}, 
				function(newItem){
					self.tables.push(newItem);
					self.newTable('');
				});
			};
		};
});