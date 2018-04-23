
(function(){

angular.module("MenuApp")
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to HOME if no other URL matches
  $urlRouterProvider.otherwise('/home');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'https://jmsanta.github.io/coursera/module4/views/home.html'
    })
   /*
    .state('categories', {
      url: '/categories',
      templateUrl: 'https://jmsanta.github.io/coursera/module4/views/categoriesList.html',
	  controller: 'MenuDataServiceController as MenuController',
	  resolve : {
		  items:['MenuDataService', function(){
			  return MenuDataService.getAllCategories();
		  }]
	  }
    })

	// item detail

	.state('categories.item', {
      url: '/categories/{itemId}',
      templateUrl: 'https://jmsanta.github.io/coursera/module4/views/itemDetail.html',
	  controller: 'itemServiceController as itemController',
	  resolve: {
		  items : ['$stateParams','MenuDataService',
		  function() {
			  return MenuDataService.getAllCategories(itemId);
		  }]
	  }
	});*/
}
})();
