app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/:lang/home', {
            templateUrl: 'pages/home.html',
            controller: 'MainCtrl',
            title: 'Home'
        })
        .when('/:lang/about', {
            templateUrl: 'pages/about.html',
            controller: 'MainCtrl',
            title: 'About'
        })
        .when('/:lang/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'MainCtrl',
            title: 'Contact'
        })
        .otherwise('/:lang/home', {
            templateUrl: 'pages/home.html',
            controller: 'MainCtrl',
            title: 'Home'
        });
}]);