const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'wordpress-zones-and-widgets-as-code';

module.exports = {
	post: {
		type: 'project',
		date: '02/03/2018',
		title: 'Wordpress zones and widgets as code',
		body: './index.md',
		summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
		tags: ['website'],
	},
	meta: {
		subtitle: 'WordPress Plugin',
		thumb: `assets/images/content/${assetNamespace}/thumb`,
		featureImage: {
			src: `assets/images/content/${assetNamespace}/banner`,
			alt: '',
			title: '',
			summary: '',
		},
		hasSidebar: true,
		disableImageTreatments: true,
		projectStillActive: true,
		projectURL: '',
		highlight: '2+ million',
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'project', siteMap, 3, 'random' );
		},
	},
}
