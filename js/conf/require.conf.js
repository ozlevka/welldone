require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'vendors/jQuery/jQuery-2.1.4.min',
        angular: 'vendors/angular.min',
        'angular-route': 'vendors/angular-route.min',
        'bootstrap': 'vendors/bootstrap.min',
        uiRouter: 'vendors/angular-ui-router.min',
        'main-controller': 'app/main-controller',
        mapService: 'app/map-service'
    },
    shim: {
        angular: {
            exports: 'angular',
            deps: ['jquery']
        },
        uiRouter : {
          deps:['angular']
        },
        'angular-route' : {
            exports: 'ngRoute',
            deps: ['angular']
        },
        bootstrap: {
            deps: ['jquery']
        },
        'main-controller': {
            deps: ['angular', 'uiRouter']
        },
        mapService: {
            deps: ['jquery']
        }
    }
});
