const path = require( 'path' );
const loaderUtils = require( 'loader-utils' );
const ejs = require( 'ejs' );
const UglifyJS = require( 'uglify-js' );
const htmlmin = require( 'html-minifier' );
const pageHandlers = require( '../inc/page' );

function throwError( message ) {
  	const error = new Error()
  	error.name = 'compile-ejs-loader';
  	error.message = error.name + '\n\n' + message + '\n';
  	error.stack = false;
  	console.error( error );
}

const getIncludeEjsDependencies = ( content, options ) => {

    const dependencyPattern = /<%[_\W]?\s*include\([^%]*\)\s*[_\W]?%>/g;

    let matches = dependencyPattern.exec( content );
    const dependencies = [];

    while ( matches ) {
        const matchFilename = matches[0].match( /(['"`])[^'"`]*\1/ );

        let filename = matchFilename !== null ? matchFilename[0].replace( /['"`]/g, '' ) : null

        if ( filename !== null ) {
            if ( ! filename.endsWith( '.ejs' ) ) {
                filename += '.ejs'
            }

            if ( ! dependencies.includes( filename ) ) {
                dependencies.push(
                    /^\//.test( filename )
                    ? path.resolve( options.root ?? '', filename.replace( /^\//, '' ) )
                    : path.resolve( 'templates/', filename )
                );
            }
        }
        matches = dependencyPattern.exec( content );
    }
    return dependencies;
}

module.exports = function( source ) {
	const req = loaderUtils.getRemainingRequest( this ).replace( /^!/, '' );
	const options = loaderUtils.getOptions( this ) || {};

	this.cacheable( false );


	const htmlWebpackPluginFilename = this._module.resourceResolveData.query.replace( '?filename=', '' );
	const htmlWebpackPlugin = this._compiler?.options.plugins.filter( ( plugin ) => typeof plugin === 'object' && plugin.options && plugin.options.filename && plugin.options.filename === htmlWebpackPluginFilename )[0];

	options.filename = path.relative( process.cwd(), this.resourcePath );
	options.cache = false;

	if ( options.htmlmin ) {
		source = htmlmin.minify( source, options['htmlminOptions'] || {} );
	}

	const template = ejs.compile( source, options )( {
		templateData: htmlWebpackPlugin.userOptions.templateData,
	} );

	const ejsDependencies = getIncludeEjsDependencies( source, options );
	// @todo Use the sitemap to add dependencies so that it includes any partials nested more than 1 deep.
	ejsDependencies.forEach( ( dependency ) => {
		this.addDependency( dependency );
	} );

	const minimize = this._compiler.options.optimization.minimize;

	if ( ! minimize && options.beautify !== false ) {
		const ast = UglifyJS.parse( template.toString() );
		ast.figure_out_scope();
		template = ast.print_to_string( { beautify: true } );
	}

	return 'module.exports = ' + JSON.stringify( template );
}
