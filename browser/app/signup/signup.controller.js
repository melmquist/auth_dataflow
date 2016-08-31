app.controller('SignupCtrl', function($scope, $http, $log, $state, AuthFactory, $rootScope) {

    $scope.signup = function() {
        AuthFactory.signup($scope.signupForm)
        .then(function(user) {
            var aUser = user.config.data;
            // AuthFactory.currentUser = aUser;
            $rootScope.currentUser = aUser;
            console.log(AuthFactory.currentUser);
            $state.go('stories');
        })
        .catch($log.error);
    };

});
