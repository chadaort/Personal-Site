const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'wildstar-launch';

module.exports = {
	post: {
		type: 'project',
		date: '01/27/2018',
		title: 'Wildstar launch',
		body: './index.md',
		summary: 'Wildstar was a fantasy/science fiction MMO game that was developed by Carbine Studios. The game and their art was incredibly beautiful. I enjoyed playing the game and absolutely loved working with their team of developers.',
		tags: ['website'],
	},
	meta: {
		subtitle: 'Game launch site',
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
		projectStillActive: true,
		projectURL: '',
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'project', siteMap, 3, 'random' );
		},
	},
}
