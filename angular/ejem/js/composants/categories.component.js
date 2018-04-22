(function () {
  'use strict';

  angular.module('MenuApp')
    .component('categories', {
      templateUrl: 'https://jmsanta.github.io/coursera/angular/ejem/categoriesList.html',
      bindings: {
        categories: '<'
      }
    });

})();