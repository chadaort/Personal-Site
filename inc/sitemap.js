const fs = require( 'fs' );
const path = require( 'path' );
const matchPattern = require( './helpers/match-pattern.js' );
const pageHandler = require( './page.js' );

module.exports.get = async () => {

	const publicPages = await matchPattern( 'content/**/page.*.js' );
	const siteMap = [];
	const validationErrors = [];

	for( const contentFile of publicPages ) {
		const data = require( path.resolve( process.cwd(), contentFile ) );
		const dataValidation = pageHandler.validateData( data );

		if ( dataValidation !== true ) {
			validationErrors.push( ` Error in ${ contentFile } \n ${ dataValidation }` );
			continue;
		}

		const pageMap = {};
		pageMap.contentFile = contentFile;

		pageMap.publicPath = pageHandler.getRoutePath( contentFile ).public;
		pageMap.uri = contentFile.replace( 'page.', '' ).replace( '.js', '.html' ).replace( 'content/', '' );
		pageMap.type = data.post.type;
		pageMap.tags = data.post.tags ? data.post.tags : [];
		pageMap.filters = data.filters ? data.filters : [];
		siteMap.push( pageMap );
	}

	if ( validationErrors.length ) {
		validationErrors.forEach( error => console.error( `Found an error in ${ contentFile } \n ${ error }` ) );
	}

	return siteMap;
}
