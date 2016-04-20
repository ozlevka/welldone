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
                templateUrl: 'partial/category.html',
                data: {title: 'Categories'}
            })
            .state('catedit', editCategoryController)
            .state('main',{
                name: 'main',
                url: '',
                data: {title: 'myLocations'}
            })
    });

    app.run(function($rootScope){
        $rootScope.$on('$stateChangeStart', function(event, toState){
            if(toState.data.title) {
                $rootScope.pageTitle = toState.data.title;
            }
        });
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
