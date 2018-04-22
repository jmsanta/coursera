(function(){
	angular.module("MenuApp")
	.controller('CategoriesController', CategoriesController);

	CategoriesController.$inject = ['MenuDataService', 'items']; 
	function CategoryController(MenuDataService, items){
		var categories = this; 
		categories.items = items;

	}
})(); 