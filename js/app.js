'use strict';

(function () {
    angular.module('PhraseGenerator', ['ngMaterial', 'ngMdIcons', 'angular-websql', 'ngRoute', 'ngTouch']);
    angular.module('PhraseGenerator').controller('mainCtr', ['$scope', '$location', '$webSql', function ($scope, $location, $webSql) {
        $scope.route = function (target) {
            $location.path(target);
        };
        $scope.db = $webSql.openDatabase('PhraseGeneratorLocalStorage', '1.0', 'Storing phrases.', 10 * 1024 * 1024);
        $scope.db.createTable('phrase', {
            key: {
                'type': 'TEXT',
                'null': 'NOT NULL'
            }
        });
        $scope.shuffle = function (excludedItem, start, end) {
            var length = end - start;
            var shuffler = [];
            for (var i = 0; i < length; i++) {
                shuffler.push(i);
            }
            shuffler = shuffler.slice(start, excludedItem).concat(shuffler.slice(excludedItem + 1, end));
            var output = shuffler[Math.floor(Math.random() * shuffler.length)];
            return output;
        };
    }]);

    angular.module('PhraseGenerator').controller('dashboardCtr', ['$scope', function ($scope) {}]);
})();