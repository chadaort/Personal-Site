const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'aion-launch';

module.exports = {
	post: {
		type: 'project',
		date: '09/22/2009',
		title: 'Aion',
		body: './index.md',
		summary: 'This was a really big project and is probably still the biggest project that I’ve worked on. Not only did we deploy an entirely new CMS (Alfresco) with customized content workflows and launch a new site but we were also dealing with a lot of work that came from the industry shift towards free-to-play',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Game launch site',
		homePageList: true,
		projectPosition: 'lead developer',
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
		hasSidebar: true,
		projectStillActive: true,
		projectURL: 'https://www.aiononline.com/',
		highlight: '2+ million monthly visitors'
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' )
	}
};
