var React = require('react');

var Layout = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },
  render: function () {
    return (
      <html lang='en'>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          <p>Hello, World.</p>
        </body>
      </html>
    )
  }
});

module.exports = Layout;
