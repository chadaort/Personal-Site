const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'city-of-heroes-redesign-and-migration';

module.exports = {
	post: {
		type: 'project',
		date: '09/27/2011',
		title: 'City of Heroes redesign and migration',
		body: './index.md',
		summary: 'City of Heroes was a superhero game so it had a semi comic feel that made heavy use of primary blue and red. The studio had recently hired a new creative director who took the art from more a cartoon feel to high-end comic look.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Game launch site',
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
		projectStillActive: true,
		projectURL: ''
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
