const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'city-of-heroes-going-rogue';

module.exports = {
	post: {
		type: 'project',
		date: '10/17/2010',
		title: 'City of Heroes Going Rogue',
		body: './index.md',
		summary: 'The City of Heroes game had already been online for 6 years and Going Rogue was the second expansion pack in the City of Heroes universe.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Expansion pack microsite',
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
		projectURL: ''
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
