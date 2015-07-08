/**
@toc

@param {Object} scope (attrs that must be defined on the scope (i.e. in the controller) - they can't just be defined in the partial html). REMEMBER: use snake-case when setting these on the partial!
TODO

@param {Object} attrs REMEMBER: use snake-case when setting these on the partial! i.e. my-attr='1' NOT myAttr='1'
TODO

@dependencies
TODO

@usage
partial / html:
TODO

controller / js:
TODO

//end: usage
*/

'use strict';

angular.module('cs-profile-praticien', ['ngResource', 'picardy.fontawesome', 'uiGmapgoogle-maps'])
    .directive('profilePraticien', ['$resource', function ($resource) {

	return {
		restrict: 'E',
		scope: {
            id: '@id'
		},
        replace: true,
		templateUrl: 'src/profile.html',
		link: function(scope, element, attrs) {
		},
		controller: function($scope, $element, $attrs) {
            var User = $resource('http://api.local/rest/search/practitioner/:userId.json', {userId:'@id'});
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

/*
            var resource = Restangular.all('search/practitioner');
            resource.one($stateParams.practitionerId + '.json').get().then(function(data){
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
*/
		}
	};
}]);