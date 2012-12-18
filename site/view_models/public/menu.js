define(["knockout", "jquery"] 
, function(ko, $) {

(function($) {
    $.fn.uniformHeight = function() {
        var maxHeight   = 0,
            max         = Math.max;

        return this.each(function() {
            maxHeight = max(maxHeight, $(this).height());
        }).height(maxHeight);
    }
})(jQuery);


  return function(model){
    var self = this;

    self.categories = ko.observableArray(model);
    self.dishes = ko.observableArray(null);

    self.basket = ko.observableArray([]);


    self.price = ko.computed(function(){
      var sum = 0;
      

      ko.utils.arrayForEach(self.basket(), function(item){
        sum += parseInt(item.price, 10);
      });

      return sum;
    });

    self.add_item = function(item){
      self.basket.push($.extend({}, item));
    };

    self.remove_item = function(item){
      var deleted_item = ko.utils.arrayFirst(self.basket(), function(i) { return item._id == i._id; });
      self.basket.remove(deleted_item);
    }

    self.chosen_category = ko.observable(model[0].name);

    self.fetch = function(){
      $.get('/api/dishes/' + self.chosen_category() + '/1', function(data){
        

        ko.utils.arrayForEach(data.dishes, function(item){
         // item.name = item.name.substring(0, 14);
        });


        self.dishes(data.dishes);

        $(".thumbnails .thumbnail .text").uniformHeight();
      });
    }

    self.select_category = function(item){
      self.chosen_category(item.name);
    };

    ko.computed(self.fetch);



    self.count = function(item){        
      var count = 0;
      ko.utils.arrayForEach(self.basket(), function(i){//todo :  find count(...)
        if (item._id == i._id)
          count++;
      });

      return count;
    }
  }
});