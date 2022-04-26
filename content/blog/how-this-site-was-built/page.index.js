const pageHandler = require( '../../../inc/page.js' );

module.exports = {
	post: {
		type: 'blog',
		date: '01/01/2018',
		title: 'How this site was built',
		body: './index.md',
		summary: 'Much of the work that I do is private and there have been some technologies that I wanted to work with or just extend my knowledge around. I also didn’t want to manage a database so I didn’t want to use WordPress or another CMS. I decided to build a static site generator using Webpack and storing my content in Markdown files.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'blog',
		homePageList: true,
		hasSidebar: true
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'blog', siteMap, 3, 'random' )
	}
};
