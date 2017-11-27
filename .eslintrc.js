module.exports = {
  parser: 'babel-eslint',
  extends: 'eslint:recommended',
  env: {
    browser: true,
  },
  rules: {
	"indent": ["error", 4],
	"linebreak-style": ["error", "windows"],
	"quotes": ["error", "single"],
	"semi": ["error", "always"],
    'class-methods-use-this': 0,
	'linebreak-style': 0,
	'no-var': 0
  }
};
