/**
 * Builds a single development bundle with HMR enabled.
 */

const path = require( 'path' );
const { WebpackManifestPlugin } = require( 'webpack-manifest-plugin' );
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
// const esLintPlugin = require( 'eslint-webpack-plugin' );
// const StylelintPlugin = require( 'stylelint-webpack-plugin' );
const config = require( '../config' );
const postcssFlexbugsFixes = require( 'postcss-flexbugs-fixes' );
const autoprefixer = require( 'autoprefixer' );

const loadSassData = () => {
	return "$site-url: '" + config.protocol + "://" + config.nakedDomain + "';";
}

module.exports = [ {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	context: process.cwd(),
	entry: [
		'webpack-plugin-serve/client',
		path.join( process.cwd(), 'assets/styles/app.scss' ),
		path.join( process.cwd(), 'assets/scripts/app.js' ),
	],
	output: {
		path: path.join( process.cwd(), 'dist' ),
		pathinfo: true,
		filename: '[fullhash]-[name].js',
		publicPath: 'http://localhost:9090/'
	},
	plugins: [
		// new StylelintPlugin(),
		// new esLintPlugin(),
		new WebpackManifestPlugin( {
			fileName: 'asset-manifest.json',
			writeToFileEmit: true,
		} ),
		new Serve( {
			static: path.join( process.cwd(), 'dist' ),
			host: '0.0.0.0',
			port: 9090,
			middleware: ( app, builtins ) => {
				return builtins.headers( { 'Access-Control-Allow-Origin': '*' } );
			},
			hmr: 'refresh-on-failure',
			log: { level: 'info' },
			client: { retry: true }
		} ),
	],
	module: {
		strictExportPresence: true,
		rules: [
			{
				oneOf: [
					{
						test: /\.jsx?$/,
						exclude: path.join( process.cwd(), 'node_modules' ),
						loader: require.resolve( 'babel-loader' ),
						options: { cacheDirectory: true }
					},
					{
						test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
						loader: 'url-loader',
						options: { limit: 8192 },
					},
					{
						test: /\.s?css$/,
						use: [
							'style-loader',
							{
								loader: 'css-loader',
								options: { sourceMap: true },
							},
							{
								loader: 'postcss-loader',
								options: {
									postcssOptions: {
										ident: 'postcss',
										sourceMap: true,
									  	plugins: [
											autoprefixer( { flexbox: 'no-2009' } ),
									  	],
									},
								},
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
									additionalData: loadSassData(),
								},
							},
						],
					},
					{
						exclude: /\.(js|html|json)$/,
						loader: 'file-loader',
						options: {},
					}
				]
			}
		],
	},

	optimization: { nodeEnv: 'development' },
	watch: true,
} ];
