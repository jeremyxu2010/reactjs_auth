var React = require('react');

var AuthenticatedComponent = require('../common/AuthenticatedComponent');

var HomePage = React.createClass({
    /**
     * @return {object}
     */
    render: function() {
        return (<h1>Hello {this.props.user ? this.props.user.username : ''}</h1>);
    }

});

module.exports = AuthenticatedComponent(HomePage);