
const buildWebsiteSchema = ( data ) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		url: data.site.url,
	}
}

const buildBreadcrumbSchema = () => {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				item: {
					'@id': 'https://example.com/dresses',
					name: 'Dresses',
				},
			},
			{
				'@type': 'ListItem',
				position: 2,
				item:{
					'@id': 'https://example.com/dresses/real',
					name: 'Real Dresses',
				},
			},
		],
	};
}

const buildWebPageSchema = ( data ) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: data.post.title,
		description: data.post.summary,
		url: data.post.url,
		datePublished: data.post.datePublished,
		dateModified: data.post.dateModified,
		isPartOf: buildWebsiteSchema(),
		breadcrumb: buildBreadcrumbSchema(),
	}
}

buildProjectArchive = ( data ) => {
	return {
		'@context': 'http://schema.org',
		'@type': 'CollectionPage',
		hasPart: data.projects.map( project => {
			return {
				'@type': 'ItemPage',
				name: '',
				url: '',
				image: '',
				thumbnailUrl: '',
				description: '',
				maintainer: {
					'@context': 'https://schema.org',
  					'@type': 'Organization',
					name: '',
					url: '',
					logo: '',
					sameAs: [
						'',
					]
				}
			}
		} ),
	};
}

const buildPerson = ( data ) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		address: {
		  	'@type': 'PostalAddress',
		  	addressLocality: 'Gadsden',
		  	addressRegion: 'AL',
		  	postalCode: '35904',
		  	streetAddress: '10034 Tabor Rd'
		},
		email: data.site.email,
		image: data.site.image,
		jobTitle: data.site.jobTitle,
		description: data.site.description,
		name: data.site.name,
		url: data.site.url,
		contactPoint: data.site.socialSites.map( site => {
			return {
				'@type': 'ContactPoint',
				contactType: site.name,
				identifier: site.id,
				image: site.img,
				url: site.url,
			}
		} ),
		hasOccupation: [
			{
				'@type': 'Role',
				hasOccupation: {
					'@type': 'Occupation',
					name: 'Software Developer',
					occupationalCategory: '15-1252.00',
				},
				startDate: '1901',
			}
		],
		worksFor: {
			'@type': 'Organization',
			name: 'Snopes',
			sameAs: 'https://www.snopes.com'
		},
		alumniOf: [
			{
				'@type': 'Organization',
				name: 'Snopes',
				sameAs: 'https://www.snopes.com',
				employee: {
			  		'@type': 'Person',
			  		hasOccupation: {
						'@type': 'EmployeeRole',
						hasOccupation: {
							'@type': 'Occupation',
							name: 'Software Developer',
							occupationalCategory: '15-1252.00',
						},
						startDate: '',
						endDate: ''
			  		},
				},
		  	},
		],
	}
}
