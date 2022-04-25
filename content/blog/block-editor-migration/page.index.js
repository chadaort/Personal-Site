const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'aion-launch';

module.exports = {
	post: {
		type: 'blog',
		date: '01/01/2018',
		title: 'Block Editor Migration',
		body: './index.md',
		summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
		tags: ['website'],
	},
	meta: {
		subtitle: 'Game launch site',
		homePageList: true,
		projectPosition: 'lead developer',
		hasSidebar: true,
		projectStillActive: true,
		projectURL: '',
		highlight: '2+ million',
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'project', siteMap, 3, 'random' );
		},
	},
}
