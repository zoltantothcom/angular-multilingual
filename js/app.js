var app = angular.module("app", ["ngRoute", "gettext"]);

app.controller('MainCtrl', ['$scope', '$location', 'gettextCatalog', function($scope, $location, gettextCatalog) {
    // load the common translations for all pages
    gettextCatalog.loadRemote("dist/lang/fr_CA_index.json");

    // reference to available, default and current languages
    $scope.languages = {
        default: 'en',
        current: $location.path().split('/')[1] || 'en',
        available: {
            'en': 'English',
            'fr_CA': 'Francais'
        }
    };

    // switching the language
    $scope.switchLang = function(lang) {
        // update the current language
        $scope.languages.current = lang;

        var page = $location.path().split('/')[2];

        // change the page URL to reflect the language change
        $location.path('/' + lang + '/' + page);

        gettextCatalog.setCurrentLanguage(lang);
        // if not the default language we need to load the translation for the page
        if (lang !== $scope.languages.default) {
            gettextCatalog.loadRemote("dist/lang/" + lang + "_" + page + ".json");
        }
    };

    // need to run on initial page load
    $scope.switchLang($scope.languages.current);
}]);