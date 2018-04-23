(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'views/categoriesList.html',
  bindings: {
    categories: '<'
  }
});

})();