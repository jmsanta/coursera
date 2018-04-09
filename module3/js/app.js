(function() {

    'use strict';

    var app = angular.module('NarrowItDownApp', []);
    app.controller('NarrowItDownController', NarrowItDownController);
    app.service('MenuSearchService', MenuSearchService);
    app.directive('foundElements', ListElements);


    NarrowItDownController.$inject = ['MenuSearchService'];

    // service that retrieves the that from server.
    // jmsanta - coursera.
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

                foundElements = $filter('filter')(dataResults.menu_items, function(d) {
                    var nam = d.name.toLowerCase();
                    if (nam.includes(term)) {
                        return nam;
                    }
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
                onRemove: '&',
                none: '<',
                found: '<'
            },
            templateUrl: 'listFound.html',
            bindToController: true,
            controller: NarrowItDownController,
            controllerAs: 'itemid'
        };
        return DDO;
    }

   // ------------ MAIN CONTROLLER -----------
    function NarrowItDownController(MenuSearchService) {
        var itemid = this;
        itemid.none = false;
        itemid.name = "";

        itemid.getMatchedMenuItems = function() {

            if (itemid.name === undefined ||
                itemid.name === '') {
                                    itemid.none = true;
            } else {
                var promiseServ = MenuSearchService.findTerm(itemid.name);

                promiseServ.then(function(formatedResult) {

                    itemid.found = formatedResult;
                    if (itemid.found.length > 0) {
                        itemid.none = false;
                    } else { // clear data ON THE SCREEN
                        itemid.found = {};
                        itemid.none = true;
                    }

                }).catch(function(error) {
                    console.log("Error in Promise : MenuSearchService");
                    //console.log("error : "+ error);
                });
            }
        }

        itemid.removeItem = function(item) {
            itemid.found = itemid.found.filter(elm => elm !== item); // by filter
        }
    }

})();
