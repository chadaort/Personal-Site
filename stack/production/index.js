const buckets = require( './buckets.js' );
const buildApiGateway = require( './api-gateway.js' );
const buildDistribution = require( './distribution' );
const buildDns = require( './dns.js' );
const buildCertificate = require( './cert.js' );
const copyFolderToS3 = require( './helpers/copy-folder-to-s3.js' );

const certificate = buildCertificate();
copyFolderToS3( 'dist/', buckets.content );
const apiGateway = buildApiGateway();
const distribution = buildDistribution( buckets.content, apiGateway, certificate );
buildDns( distribution );

module.exports = {
	content_bucket_endpoint: buckets.content.websiteEndpoint,
	distribution_domain: distribution.domainName,
	apigateway_url: apiGateway.url,
}
