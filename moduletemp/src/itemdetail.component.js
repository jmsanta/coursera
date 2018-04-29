(function () {
'use strict';

angular.module('MenuApp')
.component('itemDetail', {
  templateUrl: 'src/templates/itemdetail.template.html',
  bindings: {
    items: '<'
  }
});

})();
