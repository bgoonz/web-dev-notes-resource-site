
const file = require( 'file-system' );
const fs = require( 'fs' );


/*
.recurse(dirpath, filter, callback)
Recurse into a directory, executing callback for each file and folder. if the filename is undefiend, the callback is for folder, otherwise for file.

{string} dirpath required
{string|array|function} filter
If the filter is function, executing callback for all files and folder
{function} callback(filepath, filename, relative)
*/

/*
fs.recurse('path', function(filepath, relative, filename) { });
 
fs.recurse('path', [
  '*.css',
  '**\/*.js', 
'path/*.html',
    '!**\/path/*.js'
], function( filepath, relative, filename ) {
    if ( filename ) {
        // it's file
    } else {
        // it's folder
    }
});

//  Only using files
fs.recurse( 'path', function ( filepath, relative, filename ) {
    if ( !filename ) return;
} );

*/

