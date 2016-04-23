define([
    'ngStorage',
    'underscore'
], function(n,_){
    return ['$window', '$localStorage', '$rootScope', function($window, $localStorage, $rootScope){
        'use strict';
        var model = {};


        if($localStorage.model) {
            model = $localStorage.model;
        }

        var modelChanged = function() {
            $localStorage.model = model;
        };


        var findCategory = function(id, type) {
            if(model.categories) {
                for(var i in model.categories) {
                    if(model.categories[i].id == id)
                        if(type === 'object')
                            return model.categories[i];
                        else
                            return i;
                }

                return null;
            }
        };

        var findLocation = function(location) {
            for(var i in model.locations) {
                var cur = model.locations[i];
                if(cur.id == location.id) {
                    return i;
                }
            }

            return -1;
        };

        var locationErrors = [];
        var checkLocation = function(location) {
            if(!location.location) {
                locationErrors.push({
                    message: 'Location is empty',
                    objects: ['latError', 'lngError']
                });
            } else {
                if (!location.location.lat || !location.location.lng) {
                    locationErrors.push({
                        message: 'Location coordinates not set',
                        objects: ['latError', 'lngError']
                    });
                }
            }

            if(!location.address) {
                locationErrors.push({
                    message: 'Location Address not set',
                    objects: ['addressError']
                });
            }

            if(!location.name) {
                locationErrors.push({
                    message: 'Location Name not set',
                    objects: ['nameError']
                });
            }

            if(!location.category) {
                locationErrors.push({
                    message: 'Location Category not set',
                    objects: ['categoryError']
                });
            }

            if(locationErrors.length > 0) {
                $rootScope.$emit('locationError', locationErrors);
                return false;
            }

            return true;

        };

        return {
             saveCategory: function (catName) {
                 if (model.categories && model.categories.length) {
                     for (var i in model.categories) {
                         if (model.categories[i].name == catName) {
                             return model.categories[i].id;
                         }
                     }
                     var nextId = model.categories[model.categories.length - 1].id + 1;
                     model.categories.push({
                         name: catName,
                         id: nextId
                     });

                     modelChanged();
                 } else {
                     model.categories = [
                         {
                             name: catName,
                             id: 1
                         }
                     ];
                 }
             },

             getCategories: function () {
                 if(model.categories)
                    return model.categories;
                 else
                     return [];
             },

             updateCategory: function(id, newName) {
                 var category = findCategory(id, 'object');
                 if(category) {
                     category.name = newName;
                     modelChanged();
                 }
             },

            deleteCategory: function(id) {
                var catNumber = findCategory(id);
                if(catNumber) {
                    model.categories.splice(catNumber,1);
                    modelChanged();
                }
            },

            getCategory: function(id) {
                return findCategory(id, 'object');
            },

            getLocations: function() {
                if(model.locations) {
                    return model.locations;
                } else {
                   return [];
                }
            },

            saveLocation: function(location) {
                locationErrors = [];
                if(checkLocation(location)) {
                    if(model.locations && model.locations.length > 0) {
                        var lastId = +model.locations[model.locations.length - 1].id;
                        location.id = lastId + 1;
                        model.locations.push(location);
                    } else {
                        location.id = 1;
                        model.locations = [location];
                    }
                    modelChanged();
                    return true;
                }
                return false;
            },

            saveEditLocation: function(location) {
                locationErrors = [];
                if(checkLocation(location)) {
                    var index = findLocation(location);
                    if(index >= 0) {
                        model.locations[index] = location;
                    } else {
                        return false;
                    }
                    modelChanged();
                    return true;
                }

                return false;
            },

            locationError: function(scope, callback) {
                if(scope && typeof callback === 'function') {
                    var handler = $rootScope.$on('locationError', callback);
                    scope.$on('$destroy', handler);
                }
            },

            orderLocationsAsc : function() {
                return  _.sortBy(model.locations, function(l){
                    return l.name;
                })
            },

            orderLocationsDesc : function() {
                return this.orderLocationsAsc().reverse();
            },

            groupLocationsByCategory: function () {
                return _.groupBy(model.locations, function(loc) {
                     return loc.category;
                });
            },

            filterByCategory: function(id) {
                return _.filter(model.locations, function(loc){
                    return loc.category == id;
                });
            },

            deleteLocation: function(location) {
                var index = findLocation(location);
                if(index >= 0) {
                    model.locations.splice(index, 1);
                    modelChanged();
                }
            }

         };

    }];
});
