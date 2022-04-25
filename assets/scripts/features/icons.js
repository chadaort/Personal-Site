/**
 * SVG Icons
 * Searches for the class .icon and injects SVG based on the class name used.
 */
 export default () => {
	if ( document.querySelector( '.icon' ) ) {
		document.querySelectorAll( '.icon' ).forEach( icon => {

			const iconModifierClasses = Array.from( icon.classList ).filter( className => className.startsWith( 'icon--' ) );

			if ( ! iconModifierClasses ) {
				return;
			}

			iconModifierClasses.forEach( ( className ) => {
				switch ( className ) {

					case 'icon--toggle':
						icon.innerHTML = iconToggle();
						break;

					case 'icon--screenshot':
						icon.innerHTML = iconScreenshot();
						break;

					case 'icon--new-window':
						icon.innerHTML = iconNewWindow();
						break;

					case 'icon--github-symbol':
						icon.innerHTML = iconGithubSymbol();
						break;

					default:
						break;
				}
			} );
		} );
	}
}
