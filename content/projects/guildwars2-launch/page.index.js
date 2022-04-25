const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'guildwars2-launch';

module.exports = {
	post: {
		type: 'project',
		date: '01/10/2018',
		title: 'Guild Wars 2',
		body: './index.md',
		summary: 'Guild Wars was an incredibly popular MMO and so there was a ton of hype around the release of Guild Wars 2. ArenaNet worked with more autonomy than our other studios so we would usually support them rather than manage their properties. ',
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
