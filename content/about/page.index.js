const pageHandler = require( '../../inc/page.js' );

module.exports = {
	post: {
		type: 'about',
		date: '01/01/2018',
		title: 'About Me',
		body: './index.md',
		summary: '',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Application Developer',
		includeNestedChildren: true,
		hasSidebar: false,
		headerTitle: 'About Me',
		headerSubtitle: 'Just some history',
		pageTitle: 'A little bit about myself'
	},
	filters: {
		contentData: ( data, siteMap ) => {
			data.companies = pageHandler.getPostsByType( 'company', siteMap );
			return data;
		}
	}
};
