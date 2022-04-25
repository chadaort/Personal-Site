const pageHandler = require( '../../../inc/page.js' );

module.exports = {
	post: {
		type: 'companies',
		title: 'Companies I have worked for',
		body: './index.md',
		summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
		tags: ['website'],
	},
	meta: {
		subtitle: 'Gaming, Advertising, Media',
	},
	filters: {
		contentData: ( data, siteMap ) => {
			data.projects = pageHandler.getPostsByType( 'company', siteMap );
			return data;
		},
	},
};
