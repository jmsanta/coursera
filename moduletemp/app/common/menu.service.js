(function () {

"use strict";

angular.module('common').service('MenuService', MenuService);

MenuService.$inject = ['$http', 'ApiPath', '$filter'];


function MenuService($http, ApiPath, $filter) {


  var service = this;

  // :::::::: exist dish ::::::::
  service.existDish = function (categoryDish) {
    
	var conf = {};
	
    if (categoryDish) {
      conf.params = {'short_name': categoryDish};
    }

    return $http.get(ApiPath + '/menu_items.json', conf).then(function (response) {
		
				var categoryElements = [];

                var favDish = conf.params.short_name.toLowerCase();

                var dataResults = response.data;

                categoryElements = $filter('filter')(dataResults.menu_items, function(item) {
                    var cat = item.short_name.toLowerCase();
                    if (cat.includes(favDish)) {
                        return cat;
                    }
                });
		    // return the favorite dish
			if(response.data.menu_items.length>0) {
				return categoryElements[0];
			} 		else return false;
    });
  };

 // get MENU ITEMS  
   service.getMenuItems = function (category) {
    var conf = {};
    if (category) {
      conf.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', conf).then(function (response) {
      return response.data;
    });
  };
  
 // get CATEGORIES
  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

}

})();
