app.factory('AuthFactory', function($http, $log) {
    var AuthFactory = {};
    // AuthFactory.currentUser;

    AuthFactory.signup = function (data) {
        return $http.post('/signup', data);
    };

    AuthFactory.login = function(data) {
        return $http.post('/login', data);
    };

    //get logged in user
    AuthFactory.getCurrentUser = function(){
        return $http.get('/auth/me')
        .then(function(response){
            return response.data;
        })
    }

    return AuthFactory;
});
