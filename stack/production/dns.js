const aws = require( '@pulumi/aws' );
const pulumi = require( '@pulumi/pulumi' );
const getZoneId = require( './helpers/get-zone-id' );

const config = require( '../../config' );
const namespace = `chadort--${ config.env }--dns`;
const zoneId = getZoneId( config.nakedDomain );

const logGroup = new aws.cloudwatch.LogGroup(
	`${ namespace }--log-group`,
	{ retentionInDays: 30 },
	{ provider: aws[ 'us-east-1' ] }
);

const policyDocument = aws.iam.getPolicyDocument( {
	statements: [ {
		actions: [
			'logs:CreateLogStream',
			'logs:PutLogEvents',
		],
		resources: [ 'arn:aws:logs:*' ],
		principals: [ {
			identifiers: [ 'route53.amazonaws.com' ],
			type: 'Service',
		} ],
	} ],
} );

const policy = new aws.cloudwatch.LogResourcePolicy( `${ namespace }--log-policy`, {
	policyDocument: policyDocument.then( document => document.json ),
	policyName: `${ namespace }--log-policy`,
}, { provider: aws[ 'us-east-1' ] } );

module.exports = () => new aws.route53.QueryLog(
	`${ namespace }--query-log`,
	{
		cloudwatchLogGroupArn: logGroup.arn,
		zoneId: aws.route53.getZone(
			{ name: config.nakedDomain },
			{ async: true }
		).then( zone => zone.zoneId ),
	},
	{ dependsOn: [ policy ] }
);

module.exports = distribution => {

	const apexDomain = new aws.route53.Record( `${ namespace }--Arecord-apex`, {
		name: '',
		zoneId: zoneId,
		type: 'A',
		aliases: [ {
			name: distribution.domainName,
			zoneId: distribution.hostedZoneId,
			evaluateTargetHealth: true,
		} ],
	} );

    const wwwDomain = new aws.route53.Record( `${ namespace }--Arecord-www`, {
		name: 'www',
		zoneId: zoneId,
		type: 'A',
		aliases: [ {
			name: distribution.domainName,
			zoneId: distribution.hostedZoneId,
			evaluateTargetHealth: true,
		} ],
	} );

	const apiDomain = new aws.route53.Record( `${ namespace }--Arecord-api`, {
		name: 'api',
		zoneId: zoneId,
		type: 'A',
		aliases: [ {
			name: distribution.domainName,
			zoneId: distribution.hostedZoneId,
			evaluateTargetHealth: true,
		} ],
	} );
};
