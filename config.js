let nakedDomain,
	protocol;

switch ( process.env.NODE_ENV ) {
	case 'production':
		nakedDomain = 'chadort.com';
		protocol = 'https';
		break;

	case 'staging':
		nakedDomain = 'chadortlabs.com';
		protocol = 'https';
		break;

	default:
		nakedDomain = 'localhost:3000';
		protocol = 'http';
}

module.exports = {
	env: process.env.NODE_ENV,
	protocol,
	nakedDomain,
	siteHost: `www.${ nakedDomain }`,
	siteUrl: `${ protocol }://www.${ nakedDomain }`,
	apiHost: `api.${ nakedDomain }`,
	apiUrl: `${ protocol }://api.${ nakedDomain }`,
	apiVersion: 'v1',
	buildFolderPath: 'dist'
};
