const aws = require( '@pulumi/aws' );
const pulumi = require( '@pulumi/pulumi' );

const config = require( '../../config' );
const namespace = `chadort--${ config.env }--cloudwatch`;

module.exports = ( apiGateway ) => {

	const apiGatewayDurationMetric = awsx.lambda.metrics.duration( { function: apiGateway.getFunction( '/stage/api/msg/send-email' ) } );
	const apiGatewayDurationMetricAlarm = apiGatewayDurationMetric.withUnit( 'Seconds' ).withPeriod( 300 ).createAlarm( 'TooLong', {
		threshold: 5,
		evaluationPeriods: 3,
	} );

	const dashboard = new awsx.cloudwatch.Dashboard( 'chadort.com Dashboard', {
		widgets: [
			new awsx.cloudwatch.LineGraphMetricWidget( {
				width: 12,
				title: 'Receiving duration',
				metrics: [ apiGatewayDurationMetric.with( { extendedStatistic: 99, label: 'Duration p99' } ) ],
				annotations: new awsx.cloudwatch.HorizontalAnnotation( apiGatewayDurationMetricAlarm ),
			} ),
		],
	} );
}
