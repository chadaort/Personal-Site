const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'ncsoft-newsletters';

module.exports = {
	post: {
		type: 'project',
		date: '03/01/2010',
		title: 'NCSOFT newsletters',
		body: './index.md',
		summary: 'As the publisher, NCSOFT, managed all the newsletters for any current and upcoming games. Some games had multiple newsletters with varying frequencies and they all had a heavy design.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: '6-8 propties, once a week',
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
		projectURL: ''
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
