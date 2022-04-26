const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'lineage2-tauti';

module.exports = {
	post: {
		type: 'project',
		date: '06/13/2012',
		title: 'Lineage 2 Tauti',
		body: './index.md',
		summary: 'Lineage 2 Tauti was an expansion pack that came after the game went free-to-play. The desgin was created by our in-house design team that we closely collaborated with. This close relationship really allowed us to streamline the process and reduce follow-up desgin during the development process.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Game expansion microsite',
		thumb: `assets/images/content/${ assetNamespace }/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${ assetNamespace }/screen1-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen1.jpg`,
				alt: '',
				title: '',
				summary: ''
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen2-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen2.jpg`,
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
