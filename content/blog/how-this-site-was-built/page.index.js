const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'aion-launch';

module.exports = {
	post: {
		type: 'blog',
		date: '01/01/2018',
		title: 'How this site was built',
		body: './index.md',
		summary: 'Something something something.',
		tags: ['website'],
	},
	meta: {
		subtitle: 'blog',
		homePageList: true,
		hasSidebar: true,
		projectStillActive: true,
		projectURL: '',
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'blog', siteMap, 3, 'random' );
		},
	},
}
