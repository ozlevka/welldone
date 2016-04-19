define([
   'mapService',
    'bootstrap'
], function(){
   return ['$scope', '$window', '$state',  function($scope, $window, $state){
        $scope.map = undefined;
        if(typeof $window.map === 'function') {
           $scope.map = $window.map();
           $scope.map.init();
        }


        $scope.goMain = function() {
           $state.go('main');
        };

        $scope.goSecond  = function() {
           $state.go('second');
        }
   }];
});
