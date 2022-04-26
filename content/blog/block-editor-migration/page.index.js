const pageHandler = require( '../../../inc/page' );

module.exports = {
	post: {
		type: 'blog',
		date: '01/01/2018',
		title: 'Block Editor Migration',
		body: './index.md',
		summary: 'Considering this was to do a complete migration from custom field plugins, it was a perfect time to rethink how writers enter data for each of our content types. We met with several folks from the editorial team to better understand their workflow and what the pain points are in the classic editor.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Game launch site',
		homePageList: true,
		projectPosition: 'lead developer',
		hasSidebar: true
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
