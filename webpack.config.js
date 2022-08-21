const path = require('path');

module.exports = {
    // watch: true,
    mode: 'production',
    entry: {
      main: path.join(__dirname, 'src','burmese-gold-weight','index.js'),
    },
    output: {
        filename: 'bundle.js',
      },
  };