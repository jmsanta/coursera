(function () {
  'use strict';

  angular.module('MenuApp')
    .component('items', {
      templateUrl: 'templates/item.html',
      bindings: {
        items: '<'
      }
    });

})();