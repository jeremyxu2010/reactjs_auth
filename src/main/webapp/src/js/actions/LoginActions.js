var AppDispatcher = require('../dispatchers/AppDispatcher');
var LoginConstants = require('../constants/LoginConstants');
var RouterContainer = require('../services/RouterContainer');

module.exports = {
    loginUser: function(jwt){
        RouterContainer.get().transitionTo('/');
        localStorage.setItem('jwt', jwt);
        AppDispatcher.dispatch({
            actionType: LoginConstants.LOGIN_USER,
            jwt: jwt
        });
    },
    logoutUser: function(){
        RouterContainer.get().transitionTo('/login');
        localStorage.removeItem('jwt');
        AppDispatcher.dispatch({
            actionType: LoginConstants.LOGOUT_USER
        });
    }
};