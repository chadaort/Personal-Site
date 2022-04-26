import lightboxElement from '../partials/lightbox';

export default () => {
	const lightboxImages = document.querySelectorAll( '[data-lightbox-img]' );

	[ ...lightboxImages ].forEach( ( img, index ) => {
		img.addEventListener( 'click', ( e ) => {
			e.preventDefault();

			const currentImg = img.getAttribute( 'data-lightbox-img' );

			if ( !document.getElementById( 'lightbox' ) ) {
				document.body.insertAdjacentHTML( 'beforeend', lightboxElement() );
			}

			const lightbox = document.getElementById( 'lightbox' );

			lightbox.querySelector( '.lightbox__img' ).setAttribute( 'src', currentImg );
			lightbox.classList.add( 'lightbox--active' );
			lightbox.setAttribute( 'data-index', index );

			const lightboxControlHandler = ( e ) => {
				const currentIndex = Number( lightbox.getAttribute( 'data-index' ) );
				const targetId = e.target.getAttribute( 'id' );

				switch ( targetId ) {
				case 'lightbox-move-left':
				case 'lightbox-move-right':

					if ( !lightboxImages.length ) {
						break;
					}

					const nextIndex = targetId === 'lightbox-move-left'
						? currentIndex === 0 ? lightboxImages.length - 1 : currentIndex - 1
						: currentIndex === lightboxImages.length - 1 ? 0 : currentIndex + 1;

					lightbox.setAttribute( 'data-index', nextIndex );
					lightbox.querySelector( '.lightbox__img' ).setAttribute(
						'src',
						lightboxImages[nextIndex].getAttribute( 'data-lightbox-img' )
					);
					break;

				default:
					lightbox.classList.remove( 'lightbox--active' );
					lightbox.removeEventListener( 'click', lightboxControlHandler );
				}
			};

			lightbox.addEventListener( 'click', lightboxControlHandler );
		} );
	} );
};
