var reqwest = require('reqwest');
var when = require('when');
var LoginConstants = require('../constants/LoginConstants');
var LoginActions = require('../actions/LoginActions');

module.exports = {

    login: function(username, password) {
        return this.handleAuth(when(reqwest({
            url: LoginConstants.LOGIN_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                username: username,
                password: password
            }
        })));
    },

    logout: function() {
        LoginActions.logoutUser();
    },

    signup: function(username, password, extra) {
        return this.handleAuth(when(reqwest({
            url: LoginConstants.SIGNUP_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                username: username,
                password: password,
                extra: extra
            }
        })));
    },

    handleAuth: function(loginPromise) {
        return loginPromise
            .then(function(response) {
                var jwt = response.id_token;
                LoginActions.loginUser(jwt);
                return true;
            });
    }
};