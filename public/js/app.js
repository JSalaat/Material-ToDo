/**
 * Created by M.JUNAID on 2015-03-09.
 */
var materialToDo = angular.module('materialToDo', ['ngMaterial','ui.router']);

materialToDo.constant("basePath", "http://localhost:7000");

materialToDo.config(function($stateProvider,$urlRouterProvider,$locationProvider,$mdThemingProvider){

    $mdThemingProvider
        .theme('docs-dark', 'default')
        .primaryPalette('yellow');
        //.dark()
        //.theme('default')
        //.primaryPalette('yellow')
        //.accentPalette('pink');
        //.warnPalette('red')
        //.backgroundPalette('blue');

    $stateProvider
      .state('signUp',{
            url: "/signUp",
            templateUrl:'partials/signUp.html',
            controller:'signUpController'
    }).state('signIn',{
            url: "/signIn",
            templateUrl:'partials/signIn.html',
            controller:'signInController'
    }).state('home',{
            url: "/home",
            templateUrl:'partials/home.html',
            controller:'homeController',
            cache: false
        });

    if(window.localStorage['toDoUser']){
        $urlRouterProvider.otherwise('/home');
    }else{
        $urlRouterProvider.otherwise('/signIn');
    }

    $locationProvider.html5Mode({
        enabled : true,
        requireBase : false
    });


});
