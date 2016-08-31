app.controller('LoginCtrl', function ($scope, $http, $log, $state, AuthFactory)
{

    $scope.login = function() {
        AuthFactory.login($scope.form)
        .then(function(user) {
            $state.go('stories');
        })
        .catch($log.error);
    };

});
