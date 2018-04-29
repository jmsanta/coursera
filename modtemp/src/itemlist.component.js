(function () {
'use strict';

angular.module('MenuApp')
.component('itemlist', {
  templateUrl: 'src/templates/itemlist.template.html',
  bindings: {
    items: '<'
  }
});

})();
