const pageHandler = require( '../../../../inc/page.js' );

module.exports = {
	post: {
		type: 'company',
		date: '5/5/2016',
		title: 'Proper Media',
		body: './index.md',
		summary: 'I worked on their propiertary header bidding software, built a video player, and did feature development on the properties that they managed or owned.',
		tags: ['advertising'],
	},
	meta: {
		companyType: 'Header Bidding',
		subtitle: 'Header Bidding',
		homePageList: true,
		employmentTimeframe: '2015 - 2017',
		displayDate: 'July 2015 to May 2017',
		employmentStartDate: '07/01/2015',
		employmentEndDate: '05/01/2017',
		companyDesc: 'Custom header bidding solutions that allow publishers to maximize ad revenue and reduce overhead.',
		position: 'Senior Developer',
		disableImageTreatments: true,
		projectUrl: 'http://propermedia.io/',
		featureImage: {
			src: `assets/images/brands/proper-media/banner.png`,
			path: 'assets/images/brands/proper-media',
			filePrefix: 'banner',
			alt: 'Proper Media banner image',
			title: 'Proper Media',
			summary: '',
		},
		logo: {
			src: 'assets/images/brands/proper-media/logo',
			sizes: [ 700 ],
			maxWidth: '150px',
		},
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'company', siteMap, 3, 'random' );
		},
	},
}
