define(["knockout", "jquery"],function(ko, $) {	
	return function (model){
		var self = this;
		self.save = function(){			
			if (self.isNew){
				
			}
		}

		self.isNew = !model.dishe;
		self.dishe = model.dishe || { category : model.categories[0], price : 0, name : '', description : '' };


		self.categories = model.categories;
	}
});