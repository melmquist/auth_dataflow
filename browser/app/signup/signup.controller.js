app.controller('SignupCtrl', function($scope, $http, $log, $state, AuthFactory) {

    $scope.signup = function() {
        AuthFactory.signup($scope.signupForm)
        .then(function(user) {
            $state.go('stories');
        })
        .catch($log.error);
    }

});
