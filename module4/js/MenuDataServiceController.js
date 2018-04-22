(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuDataServiceController', MenuDataServiceController);

MenuDataServiceController.$inject = ['items'];
function MenuDataServiceController(items) {
  var mainList = this;
  mainList.items = items;
}
})();
