define(["knockout", "jquery", "ko.mapping", "render"]
	
,	function(ko, $, mapping, render) {
	
	return function(model){
		var self = this;
		
		self.categories = ko.observableArray(model.categories);
		self._dishes = ko.observableArray([]);
		self.chosen_category = ko.observable(model.categories[0]);

		self.dishes = ko.computed(function() {
			return ko.utils.arrayFilter(this._dishes(), function(item) {
				return item.category == self.chosen_category(); 				
			});
		}, self);


		self.fetch = function(){	
			// var dishes = [
			// 		{ name : '"Ницца" с тунцом и анчоусами', category : 'Холодные закуски', price : 120 , description : 'bla bla bla bla bla bla '}, 
			// 		{ name : '"Цезарь" с тигровыми креветками', category : 'Холодные закуски' , price : 120, description : 'bla bla bla bla bla bla '},
			// 		{ name : 'Легкий Норвежский салат из лосося с авокадо', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
			// 		{ name : '"Цезарь" классический', category : 'Десерты', price : 120, description : 'bla bla bla bla bla bla '},
			// 		{ name : 'Пикантный салатик с ломтиками телятины в кунжуте', category : 'Десерты', price : 120, description : 'bla bla bla bla bla bla '},
			// 		{ name : 'Теплый салат с индейкой, красным виноградом и веточкой розмарина', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
			// 		{ name : 'Салат с грецкими орехами, карамелизированной грушей и сыром пекорино', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
			// 		{ name : 'Салат с белыми грибами и proscuitto di Parmа', category : 'Десерты', price : 120, description : 'bla bla bla bla bla bla '},
			// 		{ name : 'Салат с proscuitto di Parmа, черешней и мятой', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '},
			// 		{ name : 'Салат с медальонами из свинины в пряной глазури', category : 'Холодные закуски', price : 120, description : 'bla bla bla bla bla bla '}
			// 	];

			// self._dishes(dishes);


			$.get('/api/dishes', self._dishes);
		}

		self.popup = ko.observable(null);

		self.remove = function(item){
			$.post('/api/dishes_delete', item, function(){
				self._dishes.remove(item);
			});			
		}

		self.remove_dish = function(){
			if (self.dishes().length > 0) return;

			alert('remove_category');
		};

		self.add = function(){
			render(self.popup, "new_category");
			$('#popup').modal('show');
		}

		self.edit_dishe = function(dishe) {
			render(self.popup, "edit_dish", {
				categories : model.categories,
				dishe : dishe,
				dishes : self._dishes,
				on_save : self.fetch
			});
			$('#popup').modal('show');

			return false;
		};

		self.add_dish = function(){
			render(self.popup, "edit_dish", {
				categories : model.categories,
				dishes : self._dishes,
				on_save : function(){
					self.fetch();
					$('#popup').modal('hide');
				}
			});
			$('#popup').modal('show');
		}

		self.fetch();
	}
});		