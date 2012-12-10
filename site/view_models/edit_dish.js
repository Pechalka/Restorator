define(["knockout", "jquery", "ko.mapping"],function(ko, $, mapping) {	
	return function (model){
		var self = this;
		self.save = function(){	
			if (!self.is_valide())
				return;

			$.post('/api/dishes', ko.toJS(self.dishe), model.on_save);
		}

		self.is_valide = function(){
			return self.dishe.name().length > 0;
		}

		self.isNew = !model.dishe;
		self.dishe = mapping.fromJS( model.dishe || { category : model.categories[0], price : 0, name : '', description : '' });


		self.categories = model.categories;
	}
});