const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'wordpress-generated-pages';

module.exports = {
	post: {
		type: 'project',
		date: '01/31/2018',
		title: 'WordPress generated pages',
		body: './index.md',
		summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
		tags: ['website'],
	},
	meta: {
		subtitle: 'WordPress plugin',
		thumb: `assets/images/content/${assetNamespace}/thumb`,
		featureImage: {
			src: `assets/images/content/${assetNamespace}/banner`,
			alt: '',
			title: '',
			summary: '',
		},
		disableImageTreatments: true,
		projectStillActive: true,
		projectURL: '',
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'project', siteMap, 3, 'random' );
		},
	},
}
