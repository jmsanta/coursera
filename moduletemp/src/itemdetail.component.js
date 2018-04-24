(function () {
'use strict';

angular.module('MenuApp')
.component('itemDetail', {
  templateUrl: 'src/templates/item-detail.template.html',
  bindings: {
    items: '<'
  }
});

})();
