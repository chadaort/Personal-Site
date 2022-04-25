module.exports = ( request ) => {

	// Remove and redirect any request o *index.html
	if ( request.uri.endsWith( 'index.html' ) ) {
		return {
			status: '301',
			statusDescription: 'Moved',
			headers: {
				location: [ {
					key: 'Location',
					value: request.uri.substring( 0, request.uri.length - 'index.html'.length ),
				} ],
			}
		};
	}

	// Remove and redirect any request to *.html
	if ( request.uri.endsWith( '.html' ) ) {
		return {
			status: '301',
			statusDescription: 'Moved',
			headers: {
				location: [ {
					key: 'Location',
					value: request.uri.substring( 0, request.uri.length - '.html'.length ),
				} ],
			}
		};
	}

	// Rewrite any request to */ to */index.html
	if ( request.uri.endsWith( '/' ) ) {
		return Object.assign( {}, request, { uri: `${ request.uri }index.html` } );
	}

	// Rewrite any request that doesn't end with a file extension as *.html
	if  ( ! request.uri.substring( request.uri.length - 5 ).includes( '.' ) ) {
		return Object.assign( {}, request, { uri: `${ request.uri }.html` } );
	}

	return request;
}
