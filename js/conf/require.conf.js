require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'vendors/jQuery/jQuery-2.1.4.min',
        angular: 'vendors/angular.min',
        'angular-route': 'vendors/angular-route.min',
        'bootstrap': 'vendors/bootstrap.min'
    },
    shim: {
        angular: {
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-route' : {
            exports: 'ngRoute',
            deps: ['angular']
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});
