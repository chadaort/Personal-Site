import iconClose from '../partials/icons/close';

/**
 * SVG Icons
 * Searches for the class .icon and injects SVG based on the class name used.
 */

const waitOnTransition = ( transitioningClass, el, transitioningEl, transitioningProp, addClass = true ) => new Promise( ( resolve, reject ) => {
	if ( !transitioningEl ) {
		reject();
	}
	transitioningEl.addEventListener( 'transitionend', function ( event ) {
		if ( event.propertyName === transitioningProp ) {
			resolve();
			transitioningEl.removeEventListener( 'transitionend', this );
		}
	} );

	if ( transitioningClass !== false ) {
		addClass ? el.classList.add( transitioningClass ) : el.classList.remove( transitioningClass );
	}
} );

const menuToggle = async ( active ) => {
	await waitOnTransition(
		'header__menu--transitioning-open',
		document.body,
		document.querySelector( '.header__controls-menu-toggle-icon' ),
		'left'
	);

	document.body.classList.toggle( 'blackout' );

	/*
	await waitOnTransition(
		'header__menu--active',
		document.body,
		document.getElementById( 'header__menu' ),
		'left',
		! active
	);
	*/

	await waitOnTransition(
		'header__menu--active',
		document.body,
		document.querySelector( '.header__menu-wrapper' ),
		'width',
		!active
	);

	document.body.classList.remove( 'header__menu--transitioning-open' );

	const closeBtn = document.createElement( 'a' );
	closeBtn.className = 'menu-close';
	closeBtn.href = '#';
	closeBtn.innerHTML = iconClose( true, 'sm' );

	const onCloseEvent = async ( e ) => {
		e.preventDefault();
		closeBtn.remove();

		await waitOnTransition(
			'header__menu--transitioning-close',
			document.body,
			document.querySelector( '.header__menu-wrapper' ),
			'width',
			!active
		);

		document.body.classList.remove( 'header__menu--active', 'blackout', 'header__menu--transitioning-close' );
	};

	closeBtn.addEventListener( 'click', onCloseEvent );

	document.querySelector( '.header__menu-wrapper' ).appendChild( closeBtn );
};

export default () => {
	const menuToggleBtn = document.getElementById( 'header__controls-menu-toggle' );
	if ( menuToggleBtn ) {
		menuToggleBtn.addEventListener( 'click', async () => {
			if ( document.getElementById( 'header__menu' ) ) {
				await menuToggle( document.body.classList.contains( 'header__menu--active' ) );
			}
		} );
	}
};
