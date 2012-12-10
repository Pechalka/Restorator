define(["knockout", "jquery"],function(ko, $) {	
	return function (model){
		var self = this;
		self.save = function(){
			alert('222');
		}

		var dishe = model.dishe || { category : model.categories[0], price : 0, name : '', description : '' };


		$.extend(self, dishe)
		self.categories = model.categories;
	}
});