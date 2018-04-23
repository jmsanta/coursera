(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

// Version with resolving to 1 item based on $stateParams in route config
ItemDetailController.$inject = ['$stateParams', 'items', '$filter'];
function ItemDetailController($stateParams, items, $filter) {
  var itemDetail = this;
  
  var foundElement = $filter('filter')(items.data.menu_items, function(d) {
                    var cat = d.short_name.toLowerCase();
                    if (cat.includes(itemId)) {
                        return cat;
                    }
                });
  
  itemDetail.name = foundElement.short_name;  
  itemDetail.description = foundElement.description; 
}

})();
