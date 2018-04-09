(function() {

    'use strict';

    var app = angular.module('NarrowItDownApp', []);
    app.controller('NarrowItDownController', NarrowItDownController);
    app.service('MenuSearchService', MenuSearchService);
    app.directive('foundElements', ListElements);


    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var itemid = this;
        itemid.name = "";
        itemid.none = false;        

        itemid.getMatchedMenuItems = function() {

            if ((itemid.name === "") || (itemid.name === undefined)) {
              itemid.none = true;
	     } else {
                var promiseServ = MenuSearchService.findTerm(itemid.name);
                promiseServ.then(function(formatedResult) {
		
		    itemid.found = formatedResult;
                    if (itemid.found.length > 0){
			 itemid.none = false;
		     } else { // clear data
		        itemid.found = {};
                        itemid.none = true;
		    }

                }).catch(function(error) {
                    console.log("Error in Promise : MenuSearchService");
                });
            }
        }

        itemid.removeItem = function(item) {
            //itemid.found.splice(index,1); // by index
            itemid.found = itemid.found.filter(elm => elm !== item); // by filter
        }
    }

    // service that retrieves the that from server.
    MenuSearchService.$inject = ['$http']

    function MenuSearchService($http) {

        var searcher = this;

        searcher.findTerm = function(searchTerm) {

            var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function(result) {
                var foundElements = [];
                var dataResults = result.data;

                for (var property in dataResults) {

                    if (dataResults.hasOwnProperty(property)) {

                        for (var cont = 0; cont < dataResults[property].length; cont++) {
                            var elemt = dataResults[property][cont].name;
			    elemt = elemt + ', ' + dataResults[property][cont].short_name;
			    elemt = elemt + ', ' + dataResults[property][cont].description;
			    elemt = elemt.toLowerCase();                            
			   
			    if (elemt.includes(searchTerm.toLowerCase())) {
                                foundElements.push(elemt);
                            }
                        }
                    }
                }

                return foundElements;

            }).catch(function(error) {
                console.log("Error Accesing data.");
            });
            return response;
        }
    }

    function ListElements() {
        var DDO = {
            scope: {
                found : '<',
	        onRemove : '&',
		none : '<'
            },
            templateUrl: 'listFound.html',
            bindToController: true,
            controller: NarrowItDownController,
            controllerAs: 'itemid'
        };
        return DDO;
    }
})();
