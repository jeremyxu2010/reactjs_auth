require("bootstrap/dist/css/bootstrap.min.css");

require("../less/main.less");

var React = require('react');
var ReactRouter = require('react-router');
var App = require('./components/app/App.react');
var LoginPage = require('react-router-proxy?name=login!./components/login/LoginPage.react');
var SignupPage = require('react-router-proxy?name=signup!./components/signup/SignupPage.react');
var HomePage = require('react-router-proxy?name=home!./components/home/HomePage.react');
var RouterContainer = require('./services/RouterContainer');
var LoginActions = require('./actions/LoginActions');


var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

// declare our routes and their hierarchy
var routes = (
    <Route handler={App}>
        <Route name="login" path="/login" handler={LoginPage}/>
        <Route name="signup" path="/signup" handler={SignupPage}/>
        <DefaultRoute name="home" handler={HomePage}/>
    </Route>
);

var router = ReactRouter.create({ routes: routes, location: ReactRouter.HashLocation });
RouterContainer.set(router);

var jwt = localStorage.getItem('jwt');
if (jwt) {
    LoginActions.loginUser(jwt);
}

router.run(function(Handler){
    React.render(<Handler/>, document.body);
});