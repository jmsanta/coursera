(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items'];
  function ItemsController(items) {
    var $ctrl = this;

    $ctrl.itemsDetail = items.data.menu_items;
    console.log($ctrl.items);
  }

})();