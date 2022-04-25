const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'aion-truly-free';

module.exports = {
	post: {
		type: 'project',
		date: '01/03/2018',
		title: 'Aion Truly Free',
		body: './index.md',
		summary: 'Blade and Soul was developed by NCSOFT East and launched in the west about 9 after initially launching in the east. It was another beautiful game with a really rich story.',
		tags: [ 'website'],
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
			}
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
