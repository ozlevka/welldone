require([
    'angular',
    'jquery',
    'main-controller',
    'dataService',
    'uiRouter'
], function(angular, $, mainCntl, dataService){
    var app = angular.module('WelldoneApp',['ui.router', 'ngStorage']);
    app.config(function($stateProvider){
        $stateProvider
            .state('category',{
                name:'category',
                url:'/category',
                templateUrl: 'partial/category.html'
            })
            .state('second', {
                name: 'second',
                url: '/second',
                template: '<div><h1>Hello second</h1></div>'
            })
    });

    app.factory('dataService', dataService);

    app.controller('MainCntl', mainCntl);


    angular.bootstrap(document, ['WelldoneApp']);
});
