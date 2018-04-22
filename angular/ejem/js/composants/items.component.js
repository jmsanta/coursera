(function () {
  'use strict';

  angular.module('MenuApp')
    .component('items', {
      templateUrl: 'views/itemsDetail.html',
      bindings: {
        items: '<'
      }
    });

})();