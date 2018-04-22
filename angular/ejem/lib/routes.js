
(function () {
  'use strict';

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  
  angular.module('MenuApp')
    .config(RoutesConfig);

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
      })

      .state('categories', {
        url: '/categories',
        templateUrl: 'https://jmsanta.github.io/coursera/ejem/category.html',
        controller: 'CategoriesController as categories',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'https://jmsanta.github.io/coursera/ejem/templates/items.html',
        controller: 'ItemsController as items',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      })
  }
})();