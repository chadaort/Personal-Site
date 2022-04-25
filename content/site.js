module.exports = ( siteMap ) => {



	return {

		propertyDetails: {
			description: '',
			favicon: '',
			ogImage: '',
		},
		personalDetails: {
			name: 'Chad Ort',
			email: 'chad@chadort.com',
			jobTitle: 'Engineer',
			socialSites: [
				{
					name: 'Twitter',
					id: '@',
					image: '',
					url: '',
				}
			],
		},
		globalPageData: {
			projectCount: require( '../inc/page.js' ).getPostsByType( 'project', siteMap ).length,
		},





		projectCount: require( '../inc/page.js' ).getPostsByType( 'project', siteMap ).length,

		env: process.env.NODE_ENV,
		host: 'local' !== process.env.NODE_ENV ? 'https://chadort.com' : 'http://localhost:3000',

		name: 'Chad Ort',
		email: 'chad@chadort.com',
		description: '',
		url: 'https://www.chadort.com',
		image: '',
		jobTitle: 'Engineer',

		twitterHandle: '',
		socialSites: [
			{
				name: 'Twitter',
				id: '@',
				image: '',
				url: '',
			}
		],
	};
}
