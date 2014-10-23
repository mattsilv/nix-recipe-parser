'use strict';

angular.module('externalApiApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.columns = [
            {
                header:     'qty',
                valueField: 'serving_qty'
            },
            {
                header:     'mesure',
                valueField: 'serving_unit'
            },
            {
                header:     'food',
                valueField: 'parsed_query.food'
            },
            {
                header:     'Energy',
                valueField: 'est_calories'
            }
        ];
        $scope.error = null;

        $scope.data = '';
        $scope.estimations = [];

        $scope.estimate = function(){
            $scope.error = null;
            $scope.estimations = [];
            $http.post(
                '/api/v2/estimated-nutrition/bulk',
                $scope.data,
                {
                    headers: {
                             'Content-Type': 'text/plain'
                    }
                }
            )
                .success(function (estimations) {
                    $scope.estimations = estimations;
                })
                .error(function(error){
                    $scope.error = error;
                });
        };

        $scope.getProperty = function (object, property) {
            var current = object, keys = property.split('.'), i;
            for (i = 0; i < keys.length; i += 1) {
                if(current[keys[i]]){
                    current = current[keys[i]];
                } else {
                    current = null;
                    break;
                }
            }

            return current;
        };
    });
