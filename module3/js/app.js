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
                    if (itemid.found.length === 0){
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
              //  origin: "https://davids-restaurant.herokuapp.com",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function(result) {
                var foundElements = [];
                var dataResults = result.data;
                for (var property in dataResults) {
                    if (dataResults.hasOwnProperty(property)) {
                        //console.log(result1[property].length);
                        for (var cont = 0; cont < dataResults[property].length; cont++) {
                            var line = dataResults[property][cont].name.toUpperCase();
                            if (line.includes(searchTerm.toUpperCase())) {
                                foundElements.push(line);
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
                wasfound : '<',
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
