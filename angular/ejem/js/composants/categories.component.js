(function () {
  'use strict';

  angular.module('MenuApp')
    .component('categories', {
      templateUrl: 'templates/category.html',
      bindings: {
        categories: '<'
      }
    });

})();