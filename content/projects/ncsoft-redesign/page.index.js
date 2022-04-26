const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'ncsoft-redesign';

module.exports = {
	post: {
		type: 'project',
		date: '04/20/2009',
		title: 'NCSOFT redesign',
		body: './index.md',
		summary: 'This was the first project that I worked on at NCSOFT and I came onto the project about midway. I was referred by someone on the development team and so I easily fit right in on the team.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Publisher site',
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
		projectURL: 'https://us.ncsoft.com/en-us'
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
