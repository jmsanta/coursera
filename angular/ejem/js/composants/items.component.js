(function () {
  'use strict';

  angular.module('MenuApp')
    .component('items', {
      templateUrl: 'https://jmsanta.github.io/coursera/angular/ejem/itemsDetail.html',
      bindings: {
        items: '<'
      }
    });

})();