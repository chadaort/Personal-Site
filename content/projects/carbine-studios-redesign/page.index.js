const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'carbine-studios-redesign';

module.exports = {
	post: {
		type: 'project',
		date: '01/04/2012',
		title: 'Carbine Studios',
		body: './index.md',
		summary: 'Carbine Studios was the studio behind the fantasy MMO game called Wildstar. It was a beautiful game that had a lot of excitement going into the release.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Game studio site',
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
