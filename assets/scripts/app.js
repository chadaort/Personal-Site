import React from 'react';
import { render } from 'react-dom';
import ContactForm from './components/ContactForm';
import Intro from './Intro';
import activeMenu from './features/active-menu';
import contentAside from './features/content-aside';
import icons from './features/icons';
import menuToggle from './features/menu-toggle';
import themeToggle from './features/theme-toggle';
import wwwRedirect from './features/www-redirect';
import pageFeature from './features/page-feature';
import lightbox from './features/lightbox';

if ( module.hot ) {
	module.hot.accept();
}

themeToggle();
menuToggle();
icons();
contentAside();
activeMenu();
wwwRedirect();
pageFeature();
lightbox();

if ( document.querySelector( '.is-home .page-hero' ) ) {
	new Intro( document.querySelector( '.page-hero' ) );
}

// Contact form.
if ( document.getElementById( 'contact-form' ) ) {
	render( <ContactForm />, document.getElementById( 'contact-form' ) );
}
