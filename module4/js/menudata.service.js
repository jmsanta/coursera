
angular.module('data').service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', '$filter']

function MenuDataService($http, $filter) {

	 var menuData = this;

		menuData.getAllCategories = function() {

            var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/categories.json"),
            }).then(function(result) {

                return result;

            }).catch(function(error) {
                console.log("Error Accesing data.");
            });
            return response;
        }

		menuData.getItemsForCategory = function(categoryShortName) {

            var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category="+categoryShortName)
            }).then(function(result) {

                var categoryElements = [];

                var term = categoryShortName.toLowerCase();

                var dataResults = result.data;

                categoryElements = $filter('filter')(dataResults.menu_items, function(item) {
                    var cat = item.short_name.toLowerCase();
                    if (cat.includes(term)) {
                        return cat;
                    }
                });

                return categoryElements;

            }).catch(function(error) {
                console.log("Error Accesing data.");
            });
            return response;
    }
}
