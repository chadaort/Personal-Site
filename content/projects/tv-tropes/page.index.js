const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'tv-tropes';

module.exports = {
	post: {
		type: 'project',
		date: '10/23/2015',
		title: 'TV Tropes',
		body: './index.md',
		summary: 'I worked for Proper Media for about a year and a half and one of the projects that I worked on was a wiki and forum redesign for TV Tropes.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Site redesign',
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
			}
		],
		projectStillActive: true,
		projectURL: 'https://tvtropes.org/',
		highlight: '20+ million monthly visitors'
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
