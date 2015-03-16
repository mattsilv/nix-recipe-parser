'use strict';

angular.module('externalApiApp')
    .controller('MainCtrl', function ($scope, $http, $filter, $location) {
        $scope.columns = [
            {
                header:     'qty',
                valueField: 'serving_qty'
            },
            {
                header:     'measure',
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
                            return $filter('number')(result[0].value, 2).toString() + ' ' + result[0].unit;
                        }
                    }
                },
                getSummary: function () {
                    var result;
                    if ($scope.apiResponse && $scope.apiResponse.total) {
                        result = $filter('filter')($scope.apiResponse.total.nutrients, {attr_id: '208'});
                        if (result.length) {
                            return $filter('number')(result[0].value, 2).toString() + ' ' + result[0].unit;
                        }
                    }
                }
            },
            {
                header:     'NDB number',
                valueField: 'ndb_no'
            }
        ];
        $scope.error = null;
        $scope.apiResponse = null;
        $scope.data = $location.search().request || '';

        $scope.updateUrl = function () {
            $location.search({request: $scope.data});
        };

        $scope.estimate = function () {
            $scope.error = null;
            $scope.apiResponse = null;
            $http.post(
                '/api/v2/natural',
                $scope.data,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            )
                .success(function (apiResponse) {
                    $scope.apiResponse = apiResponse;
                    $scope.total = {
                        name: 'Serving',
                        brand: {},
                        label: apiResponse.total
                    };
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

        // init
        if ($scope.data) {
            $scope.estimate();
        }
    });
