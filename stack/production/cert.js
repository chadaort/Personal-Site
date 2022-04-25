const aws = require( '@pulumi/aws' );
const pulumi = require( '@pulumi/pulumi' );
const getZoneId = require( './helpers/get-zone-id' );

const config = require( '../../config' );
const namespace = `chadort--${ config.env }--cert`;
const zoneId = getZoneId( config.nakedDomain );

const eastRegion = new aws.Provider( `${ namespace }--east`, {
	profile: aws.config.profile,
	region: 'us-east-1',
} );

const certificate = new aws.acm.Certificate( `${ namespace }--certificate`, {
	domainName: `*.${ config.nakedDomain }`,
	validationMethod: 'DNS',
	subjectAlternativeNames: [ config.nakedDomain ],
}, { provider: eastRegion } );

// This is created solely for DNS validation.
const certificateValidationDomain = new aws.route53.Record( `${ config.siteHost }-validation`, {
	name: certificate.domainValidationOptions[0].resourceRecordName,
	zoneId: zoneId,
	type: certificate.domainValidationOptions[0].resourceRecordType,
	records: [ certificate.domainValidationOptions[0].resourceRecordValue ],
	ttl: 600,
} );

// This validation process waits on ACM to complete validation using the DNS record and waiting
// on the certificate to have the status of "ISSUED".
module.exports = () => new aws.acm.CertificateValidation( `${ namespace }--certificateValidation`, {
	certificateArn: certificate.arn,
	validationRecordFqdns: [ certificateValidationDomain.fqdn ],
}, { provider: eastRegion } );
