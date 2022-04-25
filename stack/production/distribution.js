const aws = require( '@pulumi/aws' );
const pulumi = require( '@pulumi/pulumi' );
const buildRequestLambda = require( './request-lambda.js' );

const config = require( '../../config' );
const namespace = `chadort--${ config.env }--distribution`;

const requestLambda = buildRequestLambda();

const logBucket = new aws.s3.Bucket( `${ namespace }--logs`, {
	bucket: `${ namespace }--logs`,
	acl: 'private',
} );

module.exports = ( bucket, apiGateway, certificate ) => new aws.cloudfront.Distribution( namespace, {

	enabled: true,
	aliases: [
		config.nakedDomain,
		config.siteHost,
		config.apiHost,
	],
	origins: [
		{
			originId: bucket.arn,
			domainName: bucket.websiteEndpoint,
			customOriginConfig: {
				// Amazon S3 doesn't support HTTPS connections when using an S3 bucket configured as a website endpoint.
				originProtocolPolicy: 'http-only',
				httpPort: 80,
				httpsPort: 443,
				originSslProtocols: [ 'TLSv1.2' ],
			},
		},
		{
			originId: apiGateway.urn,
			// Removing the protocol and the stageName suffix from the apiGateway URL.
			// @todo - Find another property that is just the domain name so that we don't need to manipulate the string.
			domainName: apiGateway.url.apply( url => url.substring( 0, url.indexOf( `/${ config.apiVersion }/` ) ).slice( 'https://'.length ) ),
			customOriginConfig: {
				originProtocolPolicy: 'https-only',
				httpPort: 80,
				httpsPort: 443,
				originSslProtocols: [ 'TLSv1.2' ],
			},
		},
	],

	defaultRootObject: 'index.html',

	// A CloudFront distribution can configure different cache behaviors based on the request path.
	// Here we just specify a single, default cache behavior which is just read-only requests to S3.
	defaultCacheBehavior: {
		targetOriginId: bucket.arn,
		viewerProtocolPolicy: 'redirect-to-https',
		allowedMethods: [ 'HEAD', 'GET', 'OPTIONS' ],
		cachedMethods: [ 'HEAD', 'GET', 'OPTIONS' ],

		forwardedValues: {
			cookies: { forward: 'none' },
			queryString: false,
		},

		minTtl: 0,
		defaultTtl: 600,
		maxTtl: 600,

		lambdaFunctionAssociations: [
			{
				eventType: 'viewer-request',
				lambdaArn: pulumi.all( [ requestLambda.arn, requestLambda.version ] ).apply( ( [ arn, version ] ) => `${ arn }:${ version }` ),
				includeBody: true,
			},
		],
	},

	orderedCacheBehaviors: [
		{
			pathPattern: `/${ config.apiVersion }/*`,
			targetOriginId: apiGateway.urn,
			allowedMethods: [ 'HEAD', 'DELETE', 'POST', 'GET', 'OPTIONS', 'PUT', 'PATCH' ],
			cachedMethods: [ 'HEAD', 'GET' ],
			minTtl: 0,
			defaultTtl: 3600,
			maxTtl: 86400,
			forwardedValues: {
				cookies: { forward: 'all' },
				headers: [ 'Origin' ],
				queryString: true,
			},
			viewerProtocolPolicy: 'redirect-to-https',
		},
	],

	priceClass: 'PriceClass_100',

	customErrorResponses: [
		{
			errorCode: 404,
			responseCode: 404,
			responsePagePath: '/404.html',
		},
	],

	restrictions: {
		geoRestriction: {
			restrictionType: 'none',
		},
	},

	viewerCertificate: {
		acmCertificateArn: certificate.certificateArn,
		sslSupportMethod: 'sni-only',
	},

	loggingConfig: {
		bucket: logBucket.bucketDomainName,
		includeCookies: false,
		prefix: `${ config.siteHost }/`,
	},
}, { dependsOn: [ bucket, apiGateway ] } );
