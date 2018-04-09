// Javascript code is inside of an IIFE.
/*(function(){
	'use strict';

	var app = angular.module('NarrowItDownApp', []);

	app.controller('NarrowItDownController', NarrowItDownController);

	app.service('MenuSearchService', MenuSearchService)

	MenuSearchService.$inject = ['$http'];
	NarrowItDownController.$inject = ['MenuSearchService'];

	// :::::::::: MenuSearchService ::::::::::
	function NarrowItDownController(MenuSearchService) {

	    var  NarrowItDown = this;

		 // responsible for reaching out to the server (using the $http service) to retrieve the list of all the menu items.
		// it gets a promise
		var promise = MenuSearchService.getMatchedMenuItems();

		promise.then(function () {
			// process result and only keep items that match
			NarrowItDown.items = response.data;

		})
		.catch (function(error) {
			console.log("error in promise response. : " + response);
		});

	}

	function MenuSearchService($http) {
	    //implement this data sharing using the singleton approach with the .service declaration
	    var service = this;

		service.getMatchedMenuItems =  function(searchTerm) {

			var response = $http({
				method: "GET",
				url: "https://davids-restaurant.herokuapp.com/menu_items.json"
			}).then(function (result){
		 var items = [];
		 var resultAllData = result.data;
 	 	 for (var element in resultAllData) {
	 		 if (resultAllData.hasOwnProperty(element)) {
				 console.log(resultAllData[element].length);
	 					for (var cont = 0; cont < resultAllData[element].length; i++) {
 							var line = resultAllData[element][cont].name.toUpperCase();
 							if (line.includes(searchTerm.toUpperCase())){
 							  	items.push(line);
 					    }
	 				 }
	 		 }
 		 }
		 return items;
	 }).catch(function(error){
		 	 console.log("I can't access data");
	 });
	 return response;

		}
	}

})();*/
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
        itemid.empty = false;

        itemid.getMatchedMenuItems = function() {

            if ((itemid.name === "") || (itemid.name === undefined)) {
                itemid.empty = true;
            } else {
                itemid.empty = false;
                var promise = MenuSearchService.findTerm(itemid.name);
                promise.then(function(result) {

										itemid.found = result;

                    if (itemid.found.length == 0) {
                        itemid.empty = true;
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
            });

						response.then(function(result) {
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
                found: '<',
                onRemove: '&',
                empty: '<'
            },
            templateUrl: 'listFound.html',
            bindToController: true,
            controller: NarrowItDownController,
            controllerAs: 'itemid'
        };
        return DDO;
    }
})();
