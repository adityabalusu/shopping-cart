'use strict';

angular.module('cohesityApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'restangular'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/store', {
        templateUrl: 'views/store.html',
        controller: 'storeCtrl',
        resolve: {
          products: function(Store){
            return Store.getItems
          }
        }
      })
      .when('/items/:id', {
        templateUrl: 'views/item.html',
        controller: 'storeCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'storeCtrl'
      })
      .otherwise({
        redirectTo: '/store'
      });
  });
