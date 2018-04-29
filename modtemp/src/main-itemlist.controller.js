(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemListController', ItemListController);

// Version with resolving to 1 item based on $stateParams in route config
ItemListController.$inject = ['$stateParams', 'items'];
function ItemListController($stateParams, items) {
  var itemList = this;
  //var category = $stateParams.itemId.toLowerCase();

 itemList.items = items.data.menu_items;

  //$state.go("itemList", {object: itemList.items});

}

})();
