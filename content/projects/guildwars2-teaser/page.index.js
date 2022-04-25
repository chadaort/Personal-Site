const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'guildwars2-teaser';

module.exports = {
	post: {
		type: 'project',
		date: '01/11/2018',
		title: 'Guild Wars 2',
		body: './index.md',
		summary: 'ArenaNet, the studio behind Guild Wars, has an incredible amount of passion for their game with some of the most loyal players. There was so much hype about the release of Guild Wars 2 in 2012 that it was probably the best time to work for NCSOFT. ',
		tags: ['website'],
	},
	meta: {
		subtitle: 'Game teaser site',
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
