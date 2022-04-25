module.exports = ( api ) => {
	api.cache.forever();
	return {
		presets: [
			'@babel/preset-env',
			'@babel/preset-react',
		],
		'plugins': [
			[ '@babel/plugin-transform-react-jsx' ],
			[ '@babel/transform-runtime', { regenerator: true } ],
		],
	};
};
