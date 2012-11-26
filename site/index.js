$(function() {

	function viewModel(model){
		var self = this;

		self.data = ko.mapping.fromJS(model);

		self.is_free = ko.observable(true);

		self.free = function(){
			self.is_free(true);
		};
		self.not_free = function(){
			self.is_free(false);
		};

		self.reserve = function(item){
			$.post('/api/reserve', { id : item._id }, function(){
				item.free(false);
			});			
		};

		self.serve = function(item){
			item.free(true);
		};

		self.lable = ko.computed(function() {
			return self.is_free() ? "Свободны" : "Заняты";
		}, self);

		self.tables = ko.computed(function() {		
			return ko.utils.arrayFilter(self.data(), 
        		function(item){
        			return item.free() == self.is_free();
        		});
    	}, self);
	}

	$.get('/api/tables', function(data){
		var vm = new viewModel(data);
		ko.applyBindings(vm);
	});

});