define(["knockout", "jquery"] 
, function(ko, $) {


  return function(model){
    var self = this;

    self.categories = ko.observableArray(model);
    self.dishes = ko.observableArray(null);

    


    self.price = ko.computed(function(){
      var sum = 0;
      

      ko.utils.arrayForEach(model.basket(), function(item){
        sum += parseInt(item.price, 10);
      });

      return sum;
    });

    self.add_item = function(item){
      model.basket.push($.extend({}, item));
    };

    self.remove_item = function(item){
      var deleted_item = ko.utils.arrayFirst(model.basket(), function(i) { return item._id == i._id; });
      model.basket.remove(deleted_item);
    }

    self.chosen_category = ko.observable(model[0].name);

    self.fetch = function(){
      $.get('/api/dishes/' + self.chosen_category() + '/1', function(data){
        
        self.dishes(data.dishes);

      });
    }

    self.have_order = ko.computed(function() {
      return model.basket().length > 0;
    });

    self.select_category = function(item){
      self.chosen_category(item.name);
    };

    ko.computed(self.fetch);

    self.order = function() {
      if (!self.have_order())
        return false;

      window.location = '#order';
    };


    self.count = function(item){        
      var count = 0;
      ko.utils.arrayForEach(model.basket(), function(i){//todo :  find count(...)
        if (item._id == i._id)
          count++;
      });

      return count;
    }


    self.add_to_check = function() {
      $('.dropdown-toggle').dropdown();
      model.basket.removeAll();
    };

    self.cansel = function() {
      $('.dropdown-toggle').dropdown();      
    };

    self.remove = function() {
      $('.dropdown-toggle').dropdown();      
      model.basket.removeAll();      
    };
    
  }
});