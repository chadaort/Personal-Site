const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'aion-launch';

module.exports = {
	post: {
		type: 'project',
		date: '01/21/2018',
		title: 'Video player',
		body: './index.md',
		summary: 'I did a lot of ad development for Proper Media and one of the projects was to develop a video player that supported VAST and VPAID adverts.',
		tags: ['website'],
	},
	meta: {
		subtitle: 'Ad tech',
		thumb: `assets/images/content/${assetNamespace}/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${assetNamespace}/screen1-thumb`,
				raw: `assets/images/content/${assetNamespace}/screen1.jpg`,
				alt: '',
				title: '',
				summary: '',
			},
		],
		projectStillActive: true,
		projectURL: '',
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'project', siteMap, 3, 'random' );
		},
	},
}
