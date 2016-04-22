define([],
function(){
    'use strict';
    var editCategory = {
        templateUrl: 'partial/edit-category.html',
        controller: function ($scope, $stateParams, $state, dataService) {
            $scope.currentEditCategory = dataService.getCategory($stateParams.catId);
            var oldName =  $scope.currentEditCategory.name;
            $scope.newName = oldName;

            $scope.doSaveUpdate = function(name) {
                if(name != oldName) {
                    dataService.updateCategory($scope.currentEditCategory.id, name);
                    $state.go('category');
                }
                else
                    alert('Category is not changed')
            }
        }
    };


    return editCategory;
});
