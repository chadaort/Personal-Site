module.exports = {
	extends: 'stylelint-config-airbnb',
	rules: {
		indentation: 'tab',
		'string-quotes': 'single',
		"order/order": [],
		'at-rule-empty-line-before': [
			'always',
			{
				except: ['blockless-after-same-name-blockless', 'first-nested'],
				ignore: ['after-comment'],
			},
		],
		'rule-empty-line-before': [
			'always-multi-line',
			{
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
	},
};
