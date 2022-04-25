/**
 * Moves the aside content on mostly article pages to display as sidebar content on a desktop.
 */
 export default () => {
	const contentAside = document.getElementById( 'aside-content' );
	const contentMain = document.getElementById( 'main-content' );
	if ( contentAside && contentMain ) {
		const desktopAside = contentAside.cloneNode( true );
		const insertBeforeEl = contentMain.firstElementChild.classList.contains( 'article__utility' )
			? contentMain.firstElementChild.nextElementSibling
			: contentMain.firstElementChild;
		desktopAside.removeAttribute( 'id' );
		contentMain.insertBefore( desktopAside, insertBeforeEl );
	}
}
