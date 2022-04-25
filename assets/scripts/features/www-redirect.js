/**
 * Rather than creating a second cloudfront distribution, I'm handling naked domain redirects client-side.
 */
 export default () => {
	if ( window.location.hostname.includes( 'chadort.com' ) && window.location.hostname.indexOf( 'www' ) === -1 ) {
		const location = window.location;
		window.location.replace( `https://www.${ location.hostname }${ location.pathname }` );
	}
}
