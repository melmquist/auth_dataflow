app.controller('LoginCtrl', function ($scope, $http, $log, $state, AuthFactory, $rootScope)
{

    $scope.login = function() {
        AuthFactory.login($scope.form)
        .then(function(user) {
            var aUser = user.config.data;
            // AuthFactory.currentUser = aUser;
            $rootScope.currentUser = aUser;
            $state.go('stories');
            console.log($rootScope.currentUser);
        })
        .catch($log.error);
    };

});
