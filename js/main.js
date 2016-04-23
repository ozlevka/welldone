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
                views: {
                    main: {
                        templateUrl: 'partial/category.html'
                    }
                },
                data: {title: 'Categories'}
            })
            .state('catedit', {
                name: 'catedit',
                url: '/catedit/:catId',
                views: {
                    main: editCategoryController
                },
                data : {title: 'Edit Category'}

            })
            .state('general',{
                name: 'general',
                url: '',
                data: {title: 'myLocations', menu:true },
                views: {
                    menu: {
                        templateUrl: 'partial/locations-menu.html'
                    },
                    main: {
                        templateUrl: 'partial/locations.html'
                    }
                }
            })
            .state('newloc',{
                name: 'newloc',
                url: '/newloc',
                data: {title: 'New Loaction'},
                views: {
                    main: {
                        templateUrl: 'partial/new-location.html'
                    }
                }
            })
            .state('editloc',{
                name: 'editloc',
                url: '/editloc',
                data: {title: 'Edit Loaction'},
                views: {
                    main: {
                        templateUrl: 'partial/edit-location.html'
                    }
                }
            })
            .state('grploc', {
                name: 'grploc',
                url: '/grploc',
                data: {title: 'Locations By Category', menu: true},
                views: {
                    menu: {
                        templateUrl: 'partial/locations-menu.html'
                    },
                    main: {
                        templateUrl: 'partial/grouped-location.html'
                    }
                }
            })
    });

    app.run(function($rootScope){
        $rootScope.$on('$stateChangeStart', function(event, toState){
            if(toState.data.title) {
                $rootScope.pageTitle = toState.data.title;
                if(toState.data.menu) {
                    $rootScope.menuShow = true;
                } else {
                    $rootScope.menuShow = false;
                }

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
