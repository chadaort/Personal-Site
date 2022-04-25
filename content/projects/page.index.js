const pageHandler = require( '../../inc/page.js' );

module.exports = {
	post: {
		type: 'projects',
		title: 'Projects I have worked on',
		body: './index.md',
		summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
		tags: ['website'],
	},
	meta: {
		subtitle: 'Sites, Web Apps, Cloud...',
	},
	filters: {
		contentData: ( data, siteMap ) => {
			data.projects = pageHandler.getPostsByType( 'project', siteMap );
			return data;
		},
	},
}
