(function() {

    'use strict';

    var app = angular.module('NarrowItDownApp', []);
    app.controller('NarrowItDownController', NarrowItDownController);
    app.service('MenuSearchService', MenuSearchService);
    app.directive('foundElements', ListElements);


    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var itemid = this;
        itemid.none = false;
        itemid.name = "";

        itemid.getMatchedMenuItems = function() {

            if (itemid.name === undefined || itemid.name === '') {
                itemid.none = true;
            } else {
                var promiseServ = MenuSearchService.findTerm(itemid.name);

                promiseServ.then(function(formatedResult) {

                    itemid.foundItems = formatedResult;
                    if (itemid.foundItems.length > 0) {
                        itemid.none = false;
                    } else { // clear data
                        itemid.foundItems = {};
                        itemid.none = true;
                    }

                }).catch(function(error) {
                    console.log("Error in Promise : MenuSearchService");
                });
            }
        }

        itemid.removeItem = function(item) {
            itemid.foundItems = itemid.foundItems.filter(elm => elm !== item); // by filter
        }
    }

    // service that retrieves the that from server.
    MenuSearchService.$inject = ['$http', '$filter']

    function MenuSearchService($http, $filter) {

        var searcher = this;

        searcher.findTerm = function(searchTerm) {

            var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function(result) {

                var foundElements = [];

                var term = searchTerm.toLowerCase();

                var dataResults = result.data;

                foundElements = $filter('filter')(dataResults.menu_items, function (d) {
                  // for (var each in dataResults){
                      var nam = d.name.toLowerCase();
                      if(nam.includes(term)){
                        //foundElements.push(name);
                        return nam;
                      }
                    //}
                  });

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
                foundItems: '<',
                onRemove: '&',
                none: '<'
            },
            templateUrl: 'listFound.html',
            bindToController: true,
            controller: NarrowItDownController,
            controllerAs: 'itemid'
        };
        return DDO;
    }
})();
