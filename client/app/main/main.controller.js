'use strict';

angular.module('externalApiApp')
    .controller('MainCtrl', function ($scope, $http, $filter) {
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
                getValue:   function (estimation) {
                    var result;
                    if (estimation.nutrients) {
                        result = $filter('filter')(estimation.nutrients, {attr_id: '208'});
                        if (result.length) {
                            return result[0].value + ' ' + result[0].unit
                        }
                    }
                    return result;
                },
                getSummary: function () {
                    var result;
                    if ($scope.apiResponse && $scope.apiResponse.total) {
                        result = $filter('filter')($scope.apiResponse.total.nutrients, {attr_id: '208'});
                        if (result.length) {
                            return result[0].value + ' ' + result[0].unit
                        }
                    }
                    return result;
                }
            }
        ];
        $scope.error = null;

        $scope.data = '';
        $scope.estimations = [];

        $scope.estimate = function () {
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
                .success(function (apiResponse) {
                    $scope.apiResponse = apiResponse;
                })
                .error(function (error) {
                    $scope.error = error;
                });
        };

        $scope.getProperty = function (object, property) {
            var current = object, keys = property.split('.'), i;
            for (i = 0; i < keys.length; i += 1) {
                if (current[keys[i]]) {
                    current = current[keys[i]];
                } else {
                    current = null;
                    break;
                }
            }

            return current;
        };
    });
