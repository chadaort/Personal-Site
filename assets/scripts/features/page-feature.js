/**
 * Provides a toggling class that allows for a different treatment on every other hover.
 */
 export default () => {
	if ( document.querySelector( '.page-feature' ) ) {
		const pageFeature = document.querySelector( '.page-feature' );
		[ ...pageFeature.querySelectorAll( '.page-feature__img-wrapper' ) ].forEach( ( img ) => {
			img.addEventListener( 'mouseenter', () => {
				const lastTreatment = pageFeature.getAttribute( 'data-i' ) ?? 'even';
				pageFeature.setAttribute( 'data-i', lastTreatment === 'even' ? 'odd' : 'even' );
			} );
		} );
	}
}
