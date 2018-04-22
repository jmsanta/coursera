(function(){
	angular.module("MenuApp")
	.controller('CategoriesController', CategoriesController);


	CCategoriesController.$inject = ['MenuDataService', 'items']; 
	function CategoryController(MenuDataService, items){
		var categories = this; 
		categories.items = items;

	}
})(); 