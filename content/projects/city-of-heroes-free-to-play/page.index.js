const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'city-of-heroes-free-to-play';

module.exports = {
	post: {
		type: 'project',
		date: '05/31/2012',
		title: 'City of Heroes',
		body: './index.md',
		summary: 'When free-to-play came to the market, existing MMO and other game genres started having some serious discussions about what changes needed to be made.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Launches free to play',
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
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen3-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen3.jpg`,
				alt: '',
				title: '',
				summary: ''
			}
		],
		projectStillActive: false,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
