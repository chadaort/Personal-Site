const pageHandler = require( '../../inc/page.js' );

module.exports = {
	post: {
		type: 'blog-posts',
		date: '01/01/2018',
		title: 'About Me',
		body: './index.md',
		summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
		tags: ['website'],
	},
	meta: {
		subtitle: 'Originally a cat guy',
		includeNestedChildren: true,
		hasSidebar: false,
		headerTitle: 'About Me',
		headerSubtitle: 'Just some history',
		pageTitle: 'A little bit about myself',
	},
	filters: {
		contentData: ( data, siteMap ) => {
			data.blog =  pageHandler.getPostsByType( 'blog', siteMap );
			return data;
		},
	},
};
