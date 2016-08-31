app.controller('LogoutCtrl', function($scope, $http, $log, $state) {

    $scope.logout = function() {
        console.log('logging out');
        $http.put('/logout')
        .then(function(loggedOutUser){
          $state.go('login');
        })
        .catch($log.error);
    };
});
