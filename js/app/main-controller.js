define([
   'mapService',
    'bootstrap'
], function(){
   return ['$scope', '$window', '$state', '$timeout', 'dataService',  function($scope, $window, $state, $timeout, dataService){
        $scope.map = undefined;
        $scope.categories = dataService.getCategories();
        $scope.newName = '';
        $scope.currentEditCategory = undefined;

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

        $scope.doEditCategory = function(catId) {
            $state.go('catedit', {catId: catId});
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
