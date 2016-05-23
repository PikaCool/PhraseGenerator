'use strict';

(function () {
    angular.module('PhraseGenerator').config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: './template/entry.html',
            controller: function controller($scope) {}
        }).when('/generate', {
            templateUrl: './template/generate.html',
            controller: function controller($scope) {
                $scope.phraseList = [];
                $scope.currentPhrase = {
                    key: '',
                    pointer: 0
                };
                $scope.generateNewPhrase = function () {
                    $scope.currentPhrase.pointer = $scope.shuffle($scope.currentPhrase.pointer, 0, $scope.phraseList.length - 1);
                    $scope.currentPhrase.key = $scope.phraseList[$scope.currentPhrase.pointer].key;
                };
                $scope.db.selectAll('phrase').then(function (data) {
                    $scope.phraseList = [];
                    for (var key in data.rows) {
                        if (!isNaN(key)) {
                            $scope.phraseList.push(data.rows[key]);
                        }
                    }
                    if ($scope.phraseList.length === 0) {
                        $scope.$scope.currentPhrase.key = 'There are no data!';
                    } else {
                        $scope.generateNewPhrase();
                    }
                });
            }
        }).when('/add', {
            templateUrl: './template/add.html',
            controller: function controller($scope) {
                $scope.db.selectAll('phrase').then(function (data) {
                    $scope.phraseList = [];
                    for (var key in data.rows) {
                        if (!isNaN(key)) {
                            $scope.phraseList.push(data.rows[key]);
                        }
                    }
                    $scope.phraseList = $scope.phraseList.reverse();
                });
                $scope.addPhrase = function () {
                    $scope.phraseList.unshift({ key: $scope.newPhrase });
                    $scope.db.insert('phrase', {
                        key: $scope.newPhrase
                    });
                };
                $scope.removePhrase = function (index) {
                    var target = $scope.phraseList[index].key;
                    $scope.db.del('phrase', { key: target });
                    $scope.phraseList.splice(index, 1);
                };
            }
        });
    });
})();