const fs = require( 'fs' );
const path = require( 'path' );
const { defaultsDeep } = require( 'lodash' );
const marked = require( 'marked' );
const shuffle = require( './helpers/shuffle' );
const config = require( '../config.js' );
const getSiteContent = require( '../content/site' );

const REQUIRED_PROPS = [ 'type', 'title', 'body', 'summary' ];

const getRouteData = ( contentFile, siteMap ) => {
	let data = getPostData( contentFile );

	const assetManifestPath = path.join( process.cwd(), 'dist/asset-manifest.json' );
	data.assets = fs.existsSync( assetManifestPath ) ? { manifest: JSON.parse( fs.readFileSync( assetManifestPath, 'utf8' ) ) } : {};

	data.site = defaultsDeep(
		{ core: config },
		getSiteContent( siteMap )
	);

	if ( data.filters && data.filters.contentData ) {
		data = data.filters. contentData( data, siteMap );
	}

	if ( data.filters && data.filters.sidebarData ) {
		data.sidebar = data.filters.sidebarData( data, siteMap );
	}

	return data;
}

const getPostData = ( contentFile ) => {
	contentFile = contentFile ? contentFile : 'content/page.404.js';
	const contentPath = getRoutePath( contentFile ).content;
	const data = require( path.resolve( process.cwd(), contentFile ) );
	data.post = processMarkdownInProps( data.post, contentPath );
	data.post.publicPath = getRoutePath( contentFile ).public;
	data.meta = data.meta ? processMarkdownInProps( data.meta, contentPath ) : [];
	return data;
}

const processMarkdownInProps = ( obj, rootPath ) => {
	for ( const prop in obj ) {
		if ( ( typeof obj[ prop ] === 'string' || obj[ prop ] instanceof String ) && obj[ prop ].substring( obj[ prop ].length - 3 ) === '.md' ) {
			obj[ prop ] = marked( fs.readFileSync( path.resolve( rootPath, obj[ prop ] ), { encoding: 'utf8' } ) );
		}
	}
	return obj;
}

const getRoutePath = ( contentFile ) => {
	const fileName = contentFile.split( '/' ).reverse()[0].split( '.' )[1];
	const contentPath = contentFile.substring( 0, contentFile.lastIndexOf( '/' ) + 1 );
	let publicPath = contentPath.split( 'content/' )[1] ? contentPath.split( 'content/' )[1] : `/`;

	if ( publicPath === '/' && fileName === 'index' ) {
		// Home page.
		publicPath = `${ fileName }`;
	} else if ( publicPath === '/' ) {
		// Site root page.
		publicPath = `${ fileName }`;
	} else if ( fileName !== 'index' ) {
		// Page in folder but not index
		publicPath = `${ publicPath }/${ fileName }`;
	}

	return {
		content: contentPath,
		public: publicPath,
	}
}

const validateData = ( pageData ) => {

	// Ensure that we have a data property.
	if ( ! pageData.post ) {
		return 'Page data must include a `data` property';
	}

	// Ensure the data property contains all properties defined in REQUIRED_PROPS
	if ( ! REQUIRED_PROPS.every( field => pageData.post.hasOwnProperty( field ) ) ) {
		return `pageData.post must include the following properties ${ REQUIRED_PROPS.join( ', ' ) }.`;
	}

	return true;
}

const getPostsByType = ( type, siteMap, count = 'all', sort = 'ascending' ) => {
	let postList = [];

	// Get a list of posts that match a certain type.
	const posts = siteMap.filter( data => data.type === type );

	// Get post data for each item.
	posts.forEach( post => postList.push( getPostData( post.contentFile ) ) );

	postList = sortPosts( postList, sort );

	if ( typeof count === 'number' ) {
		postList = postList.slice( 0, count )
	}

	return postList;
}

const getPostsByTag = ( tag, siteMap, count = 'all', sort = 'ascending' ) => {
	let postList = [];

	// Get a list of posts that have a certain tag.
	const posts = siteMap.filter( data => data.tags.includes( tag ) );

	// Get post data for each item.
	posts.forEach( post => postList.push( getPostData( post.contentFile ) ) );

	postList = sortPosts( postList, sort );

	if ( typeof count === 'number' ) {
		postList = postList.slice( 0, count )
	}

	return postList;
}

const sortPosts = ( items, method ) => {

	switch ( method ) {
		case 'ascending':
			items = items.sort( ( a, b ) => new Date( b.post.date ) - new Date( a.post.date ) );
			break;

		case 'descending':
			items = items.sort( ( a, b ) => new Date( a.post.date ) - new Date( b.post.date ) );
			break;

		case 'random':
			items = shuffle( items );
			break;
	}
	return items;
}

/*
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
*/

module.exports = {
	getRouteData,
	getPostData,
	validateData,
	getRoutePath,
	getPostsByType,
	getPostsByTag,
}
