(function () {
'use strict';

angular.module('MenuApp')
.controller('MainShoppingListController', MainShoppingListController);


MainShoppingListController.$inject = ['MenuDataService', 'items'];
function MainShoppingListController(MenuDataService, items) {
  var mainList = this;
  // get the data of categories.
  mainList.items = items.data;
}

})();
