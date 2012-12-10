define(["knockout", "jquery"],function(ko, $) {	
	return function (model){
		var self = this;
		self.name = ko.observable('');
		self.save = function(){
			if (!self.is_valide())
				return;
			$.post('/api/add_category', { name : self.name() }, model.on_save);
			//alert(self.name());
		}

		self.is_valide = function(){
			return self.name().length > 0;
		}

	}
});