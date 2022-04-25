const awsx = require( '@pulumi/awsx' );
const pulumi = require( '@pulumi/pulumi' );

const config = require( '../../config' );
const namespace = `chadort--${ config.env }--api`;
const endpoints = [
    {
        path: 'msg/send-email',
        method: 'GET',
        eventHandler: async ( event, context ) => {
			return {
				statusCode: 200,
				headers: {
				  'Content-Type': 'text/html',
				},
				body: 'body message',
			}
		},
    }
];

module.exports = () => new awsx.apigateway.API( namespace, {
	stageName: config.apiVersion,
	restApiArgs: { binaryMediaTypes: [] },
	routes: endpoints.map( ( { path, method, eventHandler } ) => ( {
		path,
		method,
		eventHandler,
	} ) ),
} );
