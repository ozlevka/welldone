define([
   'mapService',
    'bootstrap'
], function(){
   return ['$scope', '$window', '$state', '$timeout', 'dataService',  function($scope, $window, $state, $timeout, dataService){
        $scope.map = undefined;
        $scope.categories = dataService.getCategories();
        $scope.locations = dataService.getLocations();
        $scope.newName = '';
        $scope.currentEditCategory = undefined;

        $scope.currentLocation = {};

        $scope.categoryGroupedLocations = undefined;
        $scope.locationsFiltered = false;

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

        dataService.locationError($scope, function(evt, data){
            if(data) {
              for(var i in data) {
                  var error = data[i];
                  for(var j in error.objects) {
                      $scope[error.objects[j]] = true;
                  }
              }
            }
        });

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

        $scope.clearLocationErrors = function() {
            $scope.nameError = false;
            $scope.addressError = false
            $scope.categoryError = false;
            $scope.latError = false;
            $scope.lngError = false;
        };
       $scope.clearLocationErrors();

        $scope.saveLocation = function(location) {
            $scope.clearLocationErrors();
            if(dataService.saveLocation(location)) {
                $scope.currentLocation = {};
                $state.go('general');
            }
        };
       
        $scope.locationClick = function (location) {
            $scope.map.setLocation(location);
        };

        $scope.doAddNewLocation = function() {
            $state.go('newloc');
        };

        $scope.doOrderAsc = function() {
            $scope.checkRightState();
            $scope.locations = dataService.orderLocationsAsc();
        };

       $scope.doOrderDesc = function() {
           $scope.checkRightState();
           $scope.locations = dataService.orderLocationsDesc();
       };

       $scope.checkRightState = function() {
           $scope.locationsFiltered = false;
           if($state.current.name != 'general')
           {
               $state.go('general')
           }
       };

       $scope.doGroupByCategory = function() {
            $scope.categoryGroupedLocations = [];
            $scope.locationsFiltered = false;
            var groupedData = dataService.groupLocationsByCategory();
            var keys = Object.keys(groupedData);
            for(var i in keys) {
                var id = keys[i];
                $scope.categoryGroupedLocations.push({
                    category: dataService.getCategory(id),
                    locations: groupedData[id]
                });
            }
            $state.go('grploc');
       };

       $scope.doFilterCategory = function(id) {
           $scope.checkRightState();
           $scope.locationsFiltered = true;
           $scope.locations = dataService.filterByCategory(id);
       };

       $scope.clearAll =   function() {
           $scope.checkRightState();
           $scope.locationsFiltered = false;
           $scope.locations = dataService.getLocations();
       };

       $scope.doEditLocation = function(location) {
           $scope.currentLocation = location;
           $state.go('editloc');
       };

       $scope.saveEditLocation = function(location) {
           $scope.clearLocationErrors();
           if(dataService.saveEditLocation(location)) {
               $scope.locations = dataService.getLocations();
               $state.go('general');
            }
       };

       $scope.doDeleteLocation = function(location) {
           dataService.deleteLocation(location);
           $scope.locations = dataService.getLocations();
       }
   }];
});