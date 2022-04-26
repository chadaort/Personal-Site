const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'ncsoft-events';

module.exports = {
	post: {
		type: 'project',
		date: '05/05/2010',
		title: 'NCSOFT events',
		body: './index.md',
		summary: 'As a publisher, NCSOFT managed a lot of events. We created a dedicated event site on a subdomain of ncsoft.com that allowed the event team to showcase upcoming events with an archive of past events.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Public speaking events',
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
		projectStillActive: false
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
