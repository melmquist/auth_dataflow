app.factory('AuthFactory', function($http, $log) {
    var AuthFactory = {};

    AuthFactory.signup = function (data) {
        return $http.post('/signup', data);
    };

    AuthFactory.login = function(data) {
        return $http.post('/login', data);
    };

    return AuthFactory;
});
