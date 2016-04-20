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

        $scope.goMain  = function() {
            $state.go('main');
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
        }
   }];
});
