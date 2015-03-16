'use strict';

angular.module('externalApiApp')
    .directive('nutritionLabel', function () {
        return {
            restrict: 'A',
            scope:    {
                item: '=nutritionLabel'
            },
            link:     function postLink(scope, element, attributes) {
                var getNutrientValue = function (nutrients, id) {
                    return (_.find(nutrients, {attr_id: id}) || {}).value || 0;
                };

                scope.$watch('item', function () {
                    var label, labelData;
                    element.html('');
                    if (scope.item) {
                        label = angular.element('<div>').attr('id', 'label-' + Math.random().toString(36).substring(2));
                        label.appendTo(element);

                        labelData = scope.item.label;
                        
                        label.nutritionLabel({
                            'width':                           attributes.width || 283,
                            'itemName':                        scope.item.name,
                            'brandName':                       scope.item.brand && scope.item.brand.name || null,
                            'scrollLongItemNamePixel':         38,
                            'decimalPlacesForQuantityTextbox': 2,

                            //to show the 'amount per serving' text
                            'showAmountPerServing':            true,
                            //to enable rounding of the numerical values based on the FDA rounding rules
                            //http://goo.gl/RMD2O
                            'allowFDARounding':                true,

                            //to show the ingredients value or not
                            'showIngredients':                 false,

                            //to show the 'servings per container' data and replace the default 'Serving Size' value (without unit and servings per container text and value)
                            'showServingsPerContainer':        1,

                            //these values can be change to hide some nutrition values
                            'showServingSize':                 1,
                            'showCalories':                    1,
                            'showFatCalories':                 1,
                            'showTotalFat':                    1,
                            'showSatFat':                      1,
                            'showTransFat':                    0,
                            'showPolyFat':                     1,
                            'showMonoFat':                     1,
                            'showCholesterol':                 1,
                            'showSodium':                      1,
                            'showTotalCarb':                   1,
                            'showFibers':                      1,
                            'showSugars':                      1,
                            'showProteins':                    1,
                            'showVitaminA':                    false,
                            'showVitaminC':                    false,
                            'showCalcium':                     false,
                            'showIron':                        false,

                            //these are the default values for the nutrition info
                            'valueServingSizeUnit':            labelData.serving && labelData.serving.uom || 0,
                            'valueServingPerContainer':        labelData.serving && labelData.serving.per_container || 0,
                            'valueServingUnitQuantity':        labelData.serving && labelData.serving.qty || 0,
                            'valueServingWeightGrams':         labelData.serving_weight_grams || (labelData.serving && labelData.serving.metric.qty) || 0,
                            'valueCalories':                   getNutrientValue(labelData.nutrients, 208),
                            'valueFatCalories':                getNutrientValue(labelData.nutrients, 204) * 9,
                            'valueTotalFat':                   getNutrientValue(labelData.nutrients, 204),
                            'valueSatFat':                     getNutrientValue(labelData.nutrients, 606),
                            'valueTransFat':                   getNutrientValue(labelData.nutrients, 605),
                            'valuePolyFat':                    getNutrientValue(labelData.nutrients, 646),
                            'valueMonoFat':                    getNutrientValue(labelData.nutrients, 645),
                            'valueCholesterol':                getNutrientValue(labelData.nutrients, 601),
                            'valueSodium':                     getNutrientValue(labelData.nutrients, 307),
                            'valueTotalCarb':                  getNutrientValue(labelData.nutrients, 205),
                            'valueFibers':                     getNutrientValue(labelData.nutrients, 291),
                            'valueSugars':                     getNutrientValue(labelData.nutrients, 269),
                            'valueProteins':                   getNutrientValue(labelData.nutrients, 203),
                            'valueVitaminA':                   getNutrientValue(labelData.nutrients, 318),
                            'valueVitaminC':                   getNutrientValue(labelData.nutrients, 401),
                            'valueCalcium':                    getNutrientValue(labelData.nutrients, 301),
                            'valueIron':                       getNutrientValue(labelData.nutrients, 303)
                        });
                    }
                });

            }
        };
    });