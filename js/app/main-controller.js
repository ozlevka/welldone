define([
   'mapService',
    'bootstrap'
], function(){
   return ['$scope', '$window', '$state', '$timeout', 'dataService',  function($scope, $window, $state, $timeout, dataService){
        $scope.map = undefined;
        $scope.categories = dataService.getCategories();
        $scope.newName = '';
        $scope.currentEditCategory = undefined;

        $scope.currentLocation = {};

        if(typeof $window.map === 'function') {
           $scope.map = $window.map();
           $scope.map.init();
           $scope.map.click(function(coordinates){
                $scope.$apply(function(){
                    $scope.currentLocation.location = {
                        lat: coordinates.lat(),
                        lng: coordinates.lng()
                    }
                });
           });
        }

        $scope.goCategory = function() {
            $scope.categories = dataService.getCategories();
            $state.go('category');
        };

        $scope.goMain  = function() {
            $state.go('general');
        };

        $scope.doEditCategory = function(catId) {
            $state.go('catedit', {catId: catId});
        };

        $scope.doDeleteCategory = function(id) {
            dataService.deleteCategory(id);
            $scope.categories = dataService.getCategories();
        };

        $scope.saveCategory = function(name) {
            if(name) {
                dataService.saveCategory(name);
                $scope.categories = dataService.getCategories();
            } else {
                alert('Please fill category name');
            }
        };

        $scope.saveLoaction = function(location) {
            console.log(location);
        }
   }];
});
