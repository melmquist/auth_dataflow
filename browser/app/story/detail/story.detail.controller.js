'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users, AuthFactory, $rootScope) {
  $scope.currentUser = $rootScope.currentUser;
  $scope.isLoggedIn = !!$rootScope.currentUser;
  $scope.isAdmin = $rootScope.currentUser.isAdmin;
  $scope.story = story;
  $scope.users = users;
  $scope.$watch('story', function () {
    $scope.story.save();
  }, true);

  console.log('STORY DETAIL CONTROLLER');
});
