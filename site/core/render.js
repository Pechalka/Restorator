define(["knockout", "jquery"], 
	function(ko, $) {
		return function(observable, name, model){
			require(["text!/views/" + name + ".html", "/view_models/" + name + ".js"], 
				function(view, ViewModel){
					observable({
						data : new ViewModel(model),
						html : view
					});
				});
		}
	}	
);