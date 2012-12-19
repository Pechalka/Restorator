define(["knockout", "jquery"] 
, function(ko, $) {


  return function(model){
  	var self = this;
  	$.extend(self, model);


  	//todo : move to basket
  	self.order_items = ko.computed(function() {

  		var items = [];

  		self.basket()


  		ko.utils.arrayForEach(model.basket(), function(dishe){
  			
  			var item = ko.utils.arrayFirst(items, function(i) { return i._id == dishe._id; });
			if (item){
				item.count++;
				item.sum = parseInt(dishe.price) * item.count;
			}
			else
  				items.push({ name : dishe.name, price : dishe.price, count : 1 , sum :  parseInt(dishe.price) , _id : dishe._id })       
      	});

  		return items;
  	});


  	self.tables = ko.observableArray(model.tables);
  	self.tables.unshift({ name : ''});
  	self.chosen_table = ko.observable('');

  	self.do_order = function() {
  		if (!self.can_order()) return false;

  		model.basket.removeAll()
  		window.location = '';
  		//do ajax
  	};

  	self.can_order = function() {
		return self.chosen_table() != '';  		
  	};

  	self.totalPrice = ko.computed(function() {
		var sum = 0;
		ko.utils.arrayForEach(self.order_items(), function(item){
			sum += item.sum;
		});
		return sum;
  	});
  }
});