module.exports = {
	parser: '@babel/eslint-parser',
	env: {
		browser: true,
		jest: true
	},
	extends: [
		'airbnb',
		'airbnb-babel'
	],
	ignorePatterns: [
		'dist/*'
	],
	parserOptions: {
		sourceType: 'module'
	},
	rules: {
		indent: [ 2, 'tab' ],
		'no-tabs': 0,
		'template-curly-spacing': [ 'error', 'always' ],
		'space-in-parens': [ 'error', 'always' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'comma-dangle': [
			'error',
			{ functions: 'never' }
		],
		'no-plusplus': 'off',
		'max-len': 'off',
		'import/no-extraneous-dependencies': [
			'error', {
				devDependencies: false,
				optionalDependencies: false,
				peerDependencies: false,
				packageDir: './'
			}
		],
		'no-param-reassign': 0
	}
};
