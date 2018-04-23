(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

// Version with resolving to 1 item based on $stateParams in route config
ItemDetailController.$inject = ['$stateParams', 'items'];
function ItemDetailController($stateParams, items) {
  var itemDetail = this;
  var item = items.data.menu_items[$stateParams.itemId];
  itemDetail.name = item.short_name; 
  itemDetail.quantity = item.price; 
  itemDetail.description = item.description; 
}

})();
