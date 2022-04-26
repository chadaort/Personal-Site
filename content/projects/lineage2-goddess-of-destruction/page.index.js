const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'lineage2-goddess-of-destruction';

module.exports = {
	post: {
		type: 'project',
		date: '05/29/2013',
		title: 'Lineage 2 Goddess of Destruction',
		body: './index.md',
		summary: 'Goddess of Destruction was an expansion pack for Lineage 2. Not all expansions packs got a microsite but this one did because it was a huge update.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Expansion microsite',
		thumb: `assets/images/content/${ assetNamespace }/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${ assetNamespace }/screen1-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen1.jpg`,
				alt: '',
				title: '',
				summary: ''
			}
		],
		projectStillActive: true,
		projectURL: 'https://www.lineage2.com/'
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
