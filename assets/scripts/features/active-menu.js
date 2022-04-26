/**
 * Active Menu State
 * Matches the URL of all hrefs based on the data attribute [active-menu] and adds
 * a class of active to the parent <li> if it matches the current page URL.
 */
export default () => {
	if ( document.querySelector( '[data-active-menu]' ) ) {
		document.querySelectorAll( '[data-active-menu]' ).forEach( ( menu ) => {
			menu.querySelectorAll( 'a' ).forEach( ( menuItem ) => {
				if ( menuItem.href === window.location.href ) {
					menuItem.parentNode.classList.add( 'active' );
				} else if ( menuItem.parentNode.classList.contains( 'active' ) ) {
					menuItem.parentNode.classList.remove( 'active' );
				}
			} );
		} );
	}
};
