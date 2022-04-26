const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'wildstar-teaser';

module.exports = {
	post: {
		type: 'project',
		date: '01/24/2013',
		title: 'Wildstar teaser',
		body: './index.md',
		summary: 'The concept art for WildStar was absolutely stunning. The characters had just the right amount of quirkiness and colors were bright and saturated giving it this dystopian cartoon feel.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Game launch teaser',
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
		projectStillActive: true,
		projectURL: ''
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
