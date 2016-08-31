app.controller('LogoutCtrl', function($scope, $http, $log) {

    $scope.logout = function() {
        console.log('logging out');
        $http.put('/logout')
        .catch($log.error);
    };
});
