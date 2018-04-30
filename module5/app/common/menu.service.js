(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath', '$filter'];
function MenuService($http, ApiPath, $filter) {
  var service = this;

  // exist dish
  service.existDish = function (category) {
    var config = {};
    if (category) {
      config.params = {'short_name': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
		
				var categoryElements = [];

                var favDish = config.params.short_name.toLowerCase();

                var dataResults = response.data;

                categoryElements = $filter('filter')(dataResults.menu_items, function(item) {
                    var cat = item.short_name.toLowerCase();
                    if (cat.includes(favDish)) {
                        return cat;
                    }
                });
		
		
			if(response.data.menu_items.length>0) {
				return response;
			} 		else return false;
    });
  };
  
   service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };
  
  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

 
}

})();
