const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'city-of-heroes-free-to-play';

module.exports = {
	post: {
		type: 'project',
		date: '01/06/2018',
		title: 'City of Heroes',
		body: './index.md',
		summary: 'When free-to-play came to the market, existing MMO and other game genres started having some serious discussions about what changes needed to be made.',
		tags: ['website'],
	},
	meta: {
		subtitle: 'Launches free to play',
		thumb: `assets/images/content/${assetNamespace}/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${assetNamespace}/screen1-thumb`,
				raw: `assets/images/content/${assetNamespace}/screen1.jpg`,
				alt: '',
				title: '',
				summary: '',
			},
			{
				src: `assets/images/content/${assetNamespace}/screen2-thumb`,
				raw: `assets/images/content/${assetNamespace}/screen2.jpg`,
				alt: '',
				title: '',
				summary: '',
			},
			{
				src: `assets/images/content/${assetNamespace}/screen3-thumb`,
				raw: `assets/images/content/${assetNamespace}/screen3.jpg`,
				alt: '',
				title: '',
				summary: '',
			},
		],
		projectStillActive: false,
		projectURL: '',
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'project', siteMap, 3, 'random' );
		},
	},
}