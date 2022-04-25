const aws = require( '@pulumi/aws' );

module.exports = async ( targetDomain ) => aws.route53.getZone(
	{ name: targetDomain },
	{ async: true }
).then( zone => zone.zoneId );
