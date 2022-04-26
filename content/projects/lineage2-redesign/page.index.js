const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'lineage2-redesign';

module.exports = {
	post: {
		type: 'project',
		date: '03/28/2011',
		title: 'Lineage 2 redesign',
		body: './index.md',
		summary: 'This was quite a large project where we migrated a very large site built with static files over to a CMS and also did a full site redesign.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Game site',
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
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen3-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen3.jpg`,
				alt: '',
				title: '',
				summary: ''
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen4-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen4.jpg`,
				alt: '',
				title: '',
				summary: ''
			}
		]
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
