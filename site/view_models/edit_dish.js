define(["knockout", "jquery", "ko.mapping"],function(ko, $, mapping) {	
	return function (model){
		var self = this;
		self.save = function(){	
			if (!self.is_valide())
				return;

			var data = ko.toJS(self.dishe);
			data.category = self.dishe.category();
			
			$.post('/api/dishes', data, model.on_save);
		}

		self.is_valide = function(){
			return self.dishe.name().length > 0;
		}

		self.dishe = mapping.fromJS( model.dishe );
		self.categories = model.categories;
	}
});