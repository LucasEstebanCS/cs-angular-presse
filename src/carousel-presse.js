'use strict';

angular.module('cs-angular-presse', ['ngResource', 'picardy.fontawesome','slick'])
    .directive('carouselPresse', ['$resource' ,'$timeout', function ($resource,$timeout) {
        return {
            restrict: 'E',
            scope: {
                apiHost: '@',
                nbImg : '@',
                autoplay :'@',
                autoplaySpeed : '@'
            },
            replace: true,
            templateUrl: 'src/carousel.html',
            link: function(scope, element, attrs) {
            },
            controller: function($scope, $element, $attrs) {

                var host = $scope.apiHost;
                if (host.substr(-1) === '/'){
                    host = host.substr(0, host.length - 1);
                }

                var User = $resource('http://demo7607345.mockable.io/rest/presse');
                User.get()
                    .$promise.then(function(data) {
                        if(angular.isDefined(data.reponse))
                        {
                            $timeout(function() {
                                $scope.presses = data.reponse;
                                console.log(data);
                            }, 1000);

                        }
                    });
                
            }
        };
    }
]);