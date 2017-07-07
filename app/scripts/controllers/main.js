'use strict';

angular.module('cohesityApp')
  .controller('storeCtrl',['$scope','$route','Store','Cart', function ($scope,$route,store,cart) {
    $scope.products = $route.current.locals.products
    $scope.cart = cart
  }]);
