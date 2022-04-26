const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'wordpress-zones-and-widgets-as-code';

module.exports = {
	post: {
		type: 'project',
		date: '10/23/2019',
		title: 'Wordpress zones and widgets as code',
		body: './index.md',
		summary: 'There was a need internally to have a lot of granular control over placing secondary content or marketing materials. WordPress has widgets that can be managed from the admin panel but they don’t really support distinct variations across post types or at the post level.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'WordPress Plugin',
		thumb: `assets/images/content/${ assetNamespace }/thumb`,
		featureImage: {
			src: `assets/images/content/${ assetNamespace }/banner`,
			alt: '',
			title: '',
			summary: ''
		},
		hasSidebar: true,
		disableImageTreatments: true,
		projectStillActive: true,
		projectURL: 'https://www.snopes.com',
		highlight: '10+ million monthly visitors'
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
