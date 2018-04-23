(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoryListController', MainCategoryListController);


MainCategoryListController.$inject = ['MenuDataService', 'items'];
function MainCategoryListController(MenuDataService, items) {
  var mainList = this;
  // get the data of categories.
  mainList.items = items.data;
}

})();
