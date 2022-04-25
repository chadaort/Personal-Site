const path = require( 'path' );
const mime = require( 'mime' );
const aws = require( '@pulumi/aws' );
const pulumi = require( '@pulumi/pulumi' );
const matchPattern = require( '../../../inc/helpers/match-pattern.js' );

module.exports = async ( folderPath, bucket ) => {
	matchPattern( `${ folderPath }**/*.*` )
		.then( files => {
			return files;
		})
		.then( files => files.forEach( filePathRelativeToProject => {
			const file_key = filePathRelativeToProject.substring( 0, folderPath.length ) === folderPath ? filePathRelativeToProject.slice( folderPath.length ) : filePathRelativeToProject;
			const rootFilePath = path.join( process.cwd(), filePathRelativeToProject );
			const file = new aws.s3.BucketObject( file_key, {
				key: file_key,
				acl: 'public-read',
				bucket: bucket,
				contentType: mime.getType( rootFilePath ) || undefined,
				source: new pulumi.asset.FileAsset( rootFilePath ),
			}, { parent: bucket } );
		} ) );
};
