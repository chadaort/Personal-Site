const pageHandler = require( '../inc/page.js' );

module.exports = {
	post: {
		type: 'home',
		title: 'Portfolio of Chad Ort',
		body: './index.md',
		summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
	},
	meta: {
		hasHero: true,
		hasFullPageHero: true,
		disablePageHeading: true,
		config: {
			hasHero: true,
		}
	},
	filters: {
		contentData: ( data, siteMap ) => {
			data.companies = pageHandler.getPostsByType( 'company', siteMap, 3 );
			return data;
		},
	},
}
