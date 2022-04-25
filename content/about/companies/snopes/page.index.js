const pageHandler = require( '../../../../inc/page' );

module.exports = {
	post: {
		type: 'company',
		date: '5/5/2017',
		title: 'Snopes',
		body: './index.md',
		summary: 'I work at Snopes doing both frontend and backend development.',
		tags: [ 'media' ]
	},
	meta: {
		displayDate: 'May 2017 - Present',
		subtitle: 'Fact Checking',
		companyType: 'Fact Checking',
		homePageList: true,
		employmentTimeframe: '2017 - Present',
		employmentStartDate: '05/01/2017',
		companyDesc: 'The definitive Internet reference source for researching urban legends, folklore, myths, rumors, and misinformation.',
		position: 'Lead Developer',
		hasSidebar: true,
		disableImageTreatments: true,
		projectUrl: 'https://www.snopes.com',
		featureImage: {
			src: 'assets/images/brands/snopes/banner.jpg',
			path: 'assets/images/brands/snopes',
			filePrefix: 'banner',
			alt: 'Snopes banner image',
			title: 'Snopes',
			summary: ''
		},
		logo: {
			src: 'assets/images/brands/snopes/logo',
			sizes: [ 360 ],
			maxWidth: '150px'
		}
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'company', siteMap, 3, 'random' )
	},
	content: {
		afterFeaturedImage: () => `
				<div class="snopes__featured-banner-text">
					The definitive Internet reference source for researching
					<em>urban legends</em>, <em>folklore</em>, <em>myths</em>, <em>rumors</em>, and <em>misinformation</em>.
				</div>
			`
	}
};
