define([
   'mapService',
    'bootstrap'
], function(){
   return ['$scope', '$window', '$state', 'dataService',  function($scope, $window, $state, dataService){
        $scope.map = undefined;
        $scope.categories = dataService.getCategories();
        $scope.newName = '';
        if(typeof $window.map === 'function') {
           $scope.map = $window.map();
           $scope.map.init();
        }


        $scope.goCategory = function() {
            $scope.categories = dataService.getCategories();
            $state.go('category');
        };

        $scope.goSecond  = function() {
           $state.go('second');
        };

        $scope.saveCategory = function(name) {
            if(name) {
                dataService.saveCategory(name);
                $scope.categories = dataService.getCategories();
            } else {
                alert('Please fill category name');
            }
        }
   }];
});
