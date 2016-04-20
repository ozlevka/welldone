require([
    'angular',
    'jquery',
    'main-controller',
    'dataService',
    'editcat',
    'uiRouter',
    'ngTouch'
], function(angular, $, mainCntl, dataService, editCategoryController){
    var app = angular.module('WelldoneApp',['ui.router', 'ngStorage', 'ngTouch']);
    app.config(function($stateProvider){
        $stateProvider
            .state('category',{
                name:'category',
                url:'/category',
                templateUrl: 'partial/category.html'
            })
            .state('catedit', editCategoryController)
            .state('second', {
                name: 'second',
                url: '/second',
                template: '<div><h1>Hello second</h1></div>'
            })

    });

    app.directive('apptouch', function() {

        return function(scope, element, attrs) {

            element.bind('touchstart click', function(event) {

                event.preventDefault();
                event.stopPropagation();

                scope.$apply(attrs['apptouch']);
            });
        };
    });

    app.factory('dataService', dataService);

    app.controller('MainCntl', mainCntl);


    angular.bootstrap(document, ['WelldoneApp']);
});
