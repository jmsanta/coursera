(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemServiceController', ItemServiceController);

// 'item' is injected through state's resolve
ItemServiceController.$inject = ['item']
function ItemServiceController(item) {
  var itemDetail = this;
  itemDetail.name = item.name;
  itemDetail.description = item.description;
}

})();
