var jwt_decode = require('jwt-decode');
var inherits = require('inherits');

var LoginConstants = require('../constants/LoginConstants');
var BaseStore = require('./BaseStore');

var LoginStore = function(){
    var that = this;
    BaseStore.call(this);
    this.subscribe(function(){return that._registerToActions.bind(that);});
    this._user = null;
    this._jwt = null;
};

inherits(LoginStore, BaseStore);

LoginStore.prototype._registerToActions = function(action) {
    switch(action.actionType) {
        case LoginConstants.LOGIN_USER:
            this._jwt = action.jwt;
            this._user = jwt_decode(this._jwt);
            this.emitChange();
            break;
        case LoginConstants.LOGOUT_USER:
            this._user = null;
            this.emitChange();
            break;
        default:
            break;
    }
};

LoginStore.prototype.getUser = function() {
    return this._user;
};

LoginStore.prototype.getJwt = function() {
    return this._jwt;
};

LoginStore.prototype.isLoggedIn = function() {
    return !!this._user;
};

var loginStore = new LoginStore();

module.exports = loginStore;
