define([
    'ngStorage'
], function(){
    return ['$window', '$localStorage',  function($window, $localStorage){
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

        return {
             saveCategory: function (catName) {
                 if (model.categories && model.categories.length) {
                     for (var i in model.categories) {
                         if (model.categories[i].name == catName) {
                             return model.categories[i].id;
                         }
                     }
                     var nextId = model.categories.length + 1;
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
            }

         };

    }];
});
