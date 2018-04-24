
(function () {
  'use strict';

  angular.module('MenuApp')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {

    var dataService = this;

   dataService.getAllCategories = function() {
      var response = $http({
                            method: "GET",
                            url: "https://davids-restaurant.herokuapp.com" + "/categories.json"
                          });
      return res;
    };

   dataService.getItemsForCategory = function(categoryShortName) {

      var response = $http({
                            method: "GET",
                            url: "https://davids-restaurant.herokuapp.com" + "/menu_items.json?category=" + categoryShortName
                          });
      return res;
    };
  }

})();
