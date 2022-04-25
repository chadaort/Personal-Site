const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'wildstar-teaser';

module.exports = {
	post: {
		type: 'project',
		date: '01/17/2018',
		title: 'NCSOFT frontend standards',
		body: './index.md',
		summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
		tags: ['website'],
	},
	meta: {
		subtitle: 'Team lead',
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
