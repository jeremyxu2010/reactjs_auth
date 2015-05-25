var React = require('react/addons');
var AuthService = require('../../services/AuthService');

module.exports = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function(){
        return {
            user: '',
            password: ''
        }
    },

    login: function(e) {
        e.preventDefault();
        AuthService.login(this.state.user, this.state.password)
            .catch(function(err) {
                alert("There's an error logging in");
                console.log("Error logging in", err);
            });
    },

    render: function() {
        return (
            <div className="login jumbotron center-block">
                <h1>Login</h1>
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" valueLink={this.linkState('user')} className="form-control" id="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.login}>Submit</button>
                </form>
            </div>
        );
    }
});