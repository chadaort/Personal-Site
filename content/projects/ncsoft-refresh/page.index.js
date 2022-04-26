const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'ncsoft-refresh';

module.exports = {
	post: {
		type: 'project',
		date: '11/21/2011',
		title: 'NCSOFT refresh',
		body: './index.md',
		summary: 'Corporate site changes and especially redesigns can have a really tricky approval process and this project was no different. I think we ended up adding on like a dozen stakeholders in various capacities through the process.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Publisher site',
		homePageList: true,
		projectPosition: 'lead developer',
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
			}
		],
		projectStillActive: true,
		projectURL: ''
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
