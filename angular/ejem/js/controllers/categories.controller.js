(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categories'];
  function CategoriesController(categories) {
	 var categoriesList = this;
		categoriesList.items = categories.data;
		console.log(categoriesList.items);
  }

})();