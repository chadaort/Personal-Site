/**
 * Based on on the Fisher-Yates shuffle.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm.
 * @param {*} array
 * @returns
 */
module.exports = array => {
    for ( let i = array.length; i; i-- ) {
		let j = Math.floor( Math.random() * i );
		[ array[ i - 1 ], array[ j ] ] = [ array[ j ], array[ i - 1 ] ];
	}
	return array;
};
