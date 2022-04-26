const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'element-gallery';

module.exports = {
	post: {
		type: 'project',
		date: '10/10/2008',
		title: 'Element gallery',
		body: './index.md',
		summary: 'This was a personal project that never got off the ground but I created a nice coming soon design using a chalkboard-like background with email signup and a progress indicator.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'A prelaunch site',
		thumb: `assets/images/content/${ assetNamespace }/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${ assetNamespace }/screen1-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen1.jpg`,
				alt: '',
				title: '',
				summary: ''
			}
		],
		projectStillActive: false,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
