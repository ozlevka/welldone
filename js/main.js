require([
    'angular',
    'jquery',
    'main-controller',
    'uiRouter'
], function(angular, $, mainCntl){
    var app = angular.module('WelldoneApp',['ui.router']);
    app.config(function($stateProvider){
        $stateProvider
            .state('main',{
                name:'main',
                url:'/main',
                template: '<div><h1>Hello Main</h1></div>'
            })
            .state('second', {
                name: 'second',
                url: '/second',
                template: '<div><h1>Hello second</h1></div>'
            })
    });


    app.controller('MainCntl', mainCntl);


    angular.bootstrap(document, ['WelldoneApp']);
});
