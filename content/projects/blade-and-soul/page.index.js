const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'blade-and-soul-teaser';

module.exports = {
	post: {
		type: 'project',
		date: '01/04/2018',
		title: 'Blade and Soul',
		body: './index.md',
		summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
		tags: ['website'],
	},
	meta: {
		homePageList: true,
		projectPosition: 'lead developer',
		subtitle: 'Teaser site',
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
			{
				src: `assets/images/content/${assetNamespace}/screen4-thumb`,
				raw: `assets/images/content/${assetNamespace}/screen4.jpg`,
				alt: '',
				title: '',
				summary: '',
			},
		],
		hasSidebar: true,
		projectStillActive: false,
		projectURL: 'http://something.com',
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'project', siteMap, 3, 'random' );
		},
	},
}
