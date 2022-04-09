const autoprefixer = require('autoprefixer');

module.exports = {
  Plugin: [
    autoprefixer({
      grif: true,
      browers: [
        '> 1%',
        'last 3 version',
        'android 4.2',
        'ie 8'
      ]
    })
  ]
}