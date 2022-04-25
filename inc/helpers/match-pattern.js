const glob = require( 'glob' );

/**
 * Matches files using a glob pattern.
 *
 * @param {string} pattern
 *
 * @returns {Promise}
 */
module.exports = pattern => {
	return new Promise( ( resolve, reject ) => {
		glob( pattern, ( err, files ) => {
			if ( err ) {
				return reject( err );
			}
			return resolve( files );
		} );
	} );
};
