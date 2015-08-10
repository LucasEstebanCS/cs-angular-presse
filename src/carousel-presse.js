'use strict';

angular.module('cs-angular-presse', ['ngResource', 'picardy.fontawesome','slick', 'cs-angular-webservice'])
    .directive('carouselPresse', ['$resource' ,'$timeout', 'PressWs', function ($resource, $timeout, PressWs) {
        return {
            restrict: 'E',
            scope: {
                nbImg : '@',
                autoplay :'@',
                autoplaySpeed : '@'
            },
            replace: true,
            templateUrl: 'src/carousel.html',
            link: function(scope, element, attrs) {
            },
            controller: function($scope, $element, $attrs) {
                $scope.mode = angular.isDefined($attrs.mode) && ($attrs.mode == 'carousel' || $attrs.mode == 'static') ? $attrs.mode : 'static';
                $scope.height = $scope.height ? $scope.height : 100;
                $scope.componentClasses = $attrs.class ? 'press-carousel ' + $attrs.class : 'press-carousel';
                $scope.colSize = $attrs.colSize ? $attrs.colSize : 6;

                PressWs.getAll(function(data) {
                    if (angular.isDefined(data.reponse)) {
                        $timeout(function() {

                            console.log(data.reponse);

                            $scope.presses = data.reponse;
                        }, 500);
                    }
                });
            }
        };
    }
]);