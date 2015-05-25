var React = require('react');
var LoginStore  = require('../../stores/LoginStore');

module.exports = function(ComposedComponent){
    var AuthenticatedComponent = React.createClass({
        statics: {
            willTransitionTo: function(transition) {
                if (!LoginStore.isLoggedIn()) {
                    transition.redirect('/login', {}, {'nextPath' : transition.path});
                }
            }
        },
        getInitialState: function(){
            return this._getLoginState();
        },
        _getLoginState() {
            return {
                userLoggedIn: LoginStore.isLoggedIn(),
                user: LoginStore.getUser(),
                jwt: LoginStore.getJwt()
            };
        },

        componentDidMount: function() {
            LoginStore.addChangeListener(this._onChange);
        },

        _onChange: function() {
            this.setState(this._getLoginState());
        },

        componentWillUnmount: function() {
            LoginStore.removeChangeListener(this._onChange);
        },

        render: function() {
            return (
                <ComposedComponent
                    {...this.props}
                    user={this.state.user}
                    jwt={this.state.jwt}
                    userLoggedIn={this.state.userLoggedIn} />
            );
        }
    });
    return AuthenticatedComponent;
};