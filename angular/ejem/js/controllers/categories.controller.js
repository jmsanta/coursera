(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categories'];
  function CategoriesController(cat) {
	 var categories = this;
		categories.items = cat.data;
	
  }

})();