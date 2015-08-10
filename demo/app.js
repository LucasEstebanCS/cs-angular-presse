/**
@toc
1. setup - whitelist, appPath, html5Mode
*/


'use strict';

angular.module('myApp', ['ngRoute', 'ngSanitize', 'ngTouch', 'ngAnimate', 'cs-angular-presse'])
    .config(function(csWebserviceLauncherProvider) {
        csWebserviceLauncherProvider.setBaseUrl('http://api.local/');
    })
    .config(['$routeProvider', '$locationProvider', '$compileProvider', function($routeProvider, $locationProvider, $compileProvider) {
        /**
         setup - whitelist, appPath, html5Mode
         @toc 1.
         */
        $locationProvider.html5Mode(false);		//can't use this with github demo / if don't have access to the server

        // var staticPath ='/';
        var staticPath;
        // staticPath ='/angular-directives/cs-profile-praticien/';		//local
        staticPath ='/';		//nodejs (local)
        // staticPath ='/cs-profile-praticien/';		//gh-demo
        var appPathRoute ='/';
        var pagesPath =staticPath+'demo/';


        $routeProvider.when(appPathRoute+'home', {templateUrl: pagesPath+'home/home.html'});

        $routeProvider.otherwise({redirectTo: appPathRoute+'home'});

    }]);