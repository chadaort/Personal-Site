const routeHandler = require( './route' );

describe( 'Test redirects and rewrites.', () => {

	beforeEach( () => {
		//jest.useFakeTimers();
	} );

	it( 'Test requests that end in index.html', () => {
    	const pageRequest = routeHandler( {
			uri: 'foo/index.html'
		} );
    	expect( pageRequest.headers.location[0].value ).toEqual( 'foo/' );
  	} );

	it( 'Test requests that end in .html but are not index.html', () => {
		const pageRequest = routeHandler( {
			uri: 'foo/bar.html'
		} );
		expect( pageRequest.headers.location[0].value ).toEqual( 'foo/bar' );
	} );

	it( 'Test requests that end with a slash', () => {
		const pageRequest = routeHandler( {
			uri: 'foo/bar/'
		} );
		expect( pageRequest.uri ).toEqual( 'foo/bar/index.html' );
	} );

	it( 'Test requests that have a file extension', () => {
		const pageRequest = routeHandler( {
			uri: 'foo/bar.jpg'
		} );
		expect( pageRequest.uri ).toEqual( 'foo/bar.jpg' );
	} );

	it( 'Test page requests', () => {
		const pageRequest = routeHandler( {
			uri: 'foo/bar'
		} );
		expect( pageRequest.uri ).toEqual( 'foo/bar.html' );
	} );
} );
