const pageHandler = require( '../../../inc/page.js' );

const assetNamespace = 'wordpress-gravity-forms-as-code';

module.exports = {
	post: {
		type: 'project',
		date: '02/01/2018',
		title: 'Gravity Forms as code',
		body: './index.md',
		summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
		tags: ['website'],
	},
	meta: {
		subtitle: 'Wordpress plugin',
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
