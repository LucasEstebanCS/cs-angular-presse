'use strict';

angular.module('cs-profile-praticien', ['ngResource', 'picardy.fontawesome', 'uiGmapgoogle-maps'])
    .directive('profilePraticien', ['$resource', function ($resource) {
        return {
            restrict: 'E',
            scope: {
                id: '@id',
                apiHost: '@apiHost'
            },
            replace: true,
            templateUrl: 'src/profile.html',
            link: function(scope, element, attrs) {
            },
            controller: function($scope, $element, $attrs) {
                var host = $attrs.apiHost;
                if (host.substr(-1) === '/'){
                    host = host.substr(0, host.length - 1);
                }

                var User = $resource(host + '/rest/search/practitioner/:userId', {userId:'@id'});
                User.get({userId: $attrs.id})
                    .$promise.then(function(data) {
                        $scope.practitioner = data;

                        $scope.map = {
                            center: {
                                latitude: data.location.lat,
                                longitude: data.location.lon
                            },
                            zoom: 17,
                            options: {
                                streetViewControl: false,
                                zoomControl: false,
                                mapTypeControl: false,
                                draggable: false
                            }
                        };
                    });
                
            }
        };
    }
]);