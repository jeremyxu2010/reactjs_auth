var React = require('react');

var ReactRouter = require('react-router');
var LoginStore = require('../../stores/LoginStore');
var AuthService = require('../../services/AuthService');
var Link = ReactRouter.Link;

var RouteHandler = ReactRouter.RouteHandler;

module.exports = React.createClass({

    getInitialState: function(){
        return this._getLoginState();
    },
    _getLoginState: function(){
        return {
            userLoggedIn: LoginStore.isLoggedIn()
        }
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
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">React Flux app with JWT authentication</a>
                    </div>
                    {this.getheaderItems()}
                </nav>
                <RouteHandler/>
            </div>
        );
    },

    logout: function(e) {
        e.preventDefault();
        AuthService.logout();
    },

    getheaderItems: function() {
        if (!this.state.userLoggedIn) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="login">Login</Link>
                    </li>
                    <li>
                        <Link to="signup">Signup</Link>
                    </li>
                </ul>);
        } else {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="home">Home</Link>
                    </li>
                    <li>
                        <a href="" onClick={this.logout}>Logout</a>
                    </li>
                </ul>);
        }
    }
});