(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'https://jmsanta.github.io/coursera/angular/ejem/views/home.html'
      })

      .state('categories', {
        url: '/categories',
        templateUrl: 'https://jmsanta.github.io/coursera/angular/ejem/views/categoriesList.html',
        controller: 'CategoriesController as categories',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'https://jmsanta.github.io/coursera/angular/ejem/views/itemsDetail.html',
        controller: 'ItemsController as items',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      })
  }
})();