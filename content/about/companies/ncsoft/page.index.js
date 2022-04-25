const pageHandler = require( '../../../../inc/page.js' );

module.exports = {
	post: {
		type: 'company',
		date: '5/5/2009',
		title: 'NCSOFT',
		body: './index.md',
		summary: 'I managed a team of 18 developers in 2 states and 8 properties with traffic ranging from a million monthly visitors to 60 million.',
		tags: ['gaming'],
	},
	meta: {
		companyType: 'Video Games',
		subtitle: 'Video Games',
		homePageList: true,
		employmentTimeframe: '2009 - 2015',
		displayDate: 'Febuary 2009 to March 2015',
		employmentStartDate: '02/01/2009',
		employmentEndDate: '03/01/2015',
		position: 'Lead Developer/Development Manager',
		companyDesc: 'NCSoft is a South Korean video game developer. The company has produced Lineage, City of Heroes, WildStar, Guild Wars, Aion, Blade & Soul, Exteel and Master X Master.',
		disableImageTreatments: true,
		projectUrl: 'https://us.ncsoft.com/en-us',
		featureImage: {
			src: `assets/images/brands/ncsoft/banner.png`,
			path: 'assets/images/brands/ncsoft',
			filePrefix: 'banner',
			alt: 'NCSOFT banner image',
			title: 'NCSOFT',
			summary: '',
		},
		logo: {
			src: 'assets/images/brands/ncsoft/logo',
			sizes: [
				244,
			],
			maxWidth: '80px',
		},
		homeish: true,
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'company', siteMap, 3, 'random' );
		},
	},
}
