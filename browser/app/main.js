'use strict';

var app = angular.module('auther', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $urlRouterProvider.when('/auth/:provider', function () {
  window.location.reload();
});
});

app.run(function (AuthFactory, $rootScope){
    AuthFactory.getCurrentUser()
    .then(function(currentUser){
        $rootScope.currentUser = currentUser;
    });

    AuthFactory.getAdminUser()
    .then(function(adminUser) {
        $rootScope.adminUser = adminUser;
        console.log($rootScope.adminUser);
    })
})

    // put current user on root scope
