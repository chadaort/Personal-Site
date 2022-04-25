const aws = require( '@pulumi/aws' );
const pulumi = require( '@pulumi/pulumi' );

const config = require( '../../config' );
const namespace = `chadort--${ config.env }--bucket`;

const contentBucket = new aws.s3.Bucket(
	`${ namespace }--content`,
    {
        bucket: config.siteHost,
        acl: 'public-read',
        website: {
            indexDocument: 'index.html',
            errorDocument: '404.html',
        },
    }
);

/*
const apexRedirectBucket = new aws.s3.Bucket(
	`${ namespace }--apx-redirect`,
    {
        bucket: 'chadort.com',
        acl: 'public-read',
        website: {
            indexDocument: 'index.html',
            errorDocument: '404.html',
        },
    }
);

const apexRedirectObj = new aws.s3.BucketObject( 'index.html', {
	key: 'index.html',
	acl: 'public-read',
	bucket: apexRedirectBucket,
	contentType: 'text/html',
	content: '',
	websiteRedirect: 'www.chadort.com',
}, { parent: apexRedirectBucket } );
*/

module.exports = {
	content: contentBucket,
}
