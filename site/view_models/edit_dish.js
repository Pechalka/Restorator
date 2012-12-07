define(["knockout", "jquery"],function(ko, $) {	
	return function (model){
		var self = this;
		self.save = function(){
			alert('222');
		}
		self.categories = ko.observable(model);
	}
});