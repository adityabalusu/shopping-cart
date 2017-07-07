'use strict';

angular.module('cohesityApp')
  .service('Store',['Restangular', function Store(Restangular) {
    var getProducts = Restangular.oneUrl("inventory",'http://demo7687977.mockable.io/inventory').get()
      
    return {
        'getItems':getProducts
    }
}]);
