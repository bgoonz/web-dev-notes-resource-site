/*
readdir method  It takes the directory path and a callback function as parameters. 
--The callback gets two arguments (err and entries) where entries is an array of the names of the entries in the directory 
-excluding . and .. — the current directory and the parent directory, respectively.
*/
// const fs = require('fs');
// 
// function buildTree(startPath) {
//   fs.readdir(startPath, (err, entries) => {
//     console.log(entries);
//   });
// }
// 
// buildTree('./');
//---------------------------------------------------------\\
/*
 lstatSync. This returns an fs.Stats object, which itself has an isDirectory method. This method returns true or false accordingly.
*/
// function buildTree(startPath) {
//   fs.readdir(startPath, (err, entries) => {
//     console.log(entries);
//     entries.forEach((file) => {
//       const path = `${startPath}/${file}`;
// 
//       if (fs.lstatSync(path).isDirectory()) {
//         buildTree(path);
//       }
//     });
//   });
// }
// buildTree("../.");
/*
bryan_dir:js-shell_exitstatus:0 ====>
node js-shell.js
[ 'js-shell.js', 'scrap.md' ]
[
  'js-shell',
  'postgreSQL-postBird_installation.html',
  'testing.html',
  'webpack.md'
]
[ 'js-shell.js', 'scrap.md' ]
*/
//---------------------------------------------------------\\
// const fs = require("fs");
// const Path = require("path");
// function processFile(path) {
//   console.log(path);
// }
// function buildTree(startPath) {
//   fs.readdir(startPath, (err, entries) => {
//     entries.forEach((file) => {
//       const path = Path.join(startPath, file);
//       if (fs.lstatSync(path).isDirectory()) {
//         buildTree(path);
//       } else if (file.match(/\.md$/)) {
//         processFile(path);
//       }
//     });
//   });
// }
//If you run the script at this point, it should recurse a directory tree and print out the path of any markdown files it might find.
//buildTree("./");
//---------------------------------------------------------\\
/*
open up the files that the script finds and to process them.
This can be done using Node’s readFileSync method which accepts the file path and its encoding (optional) as parameters.
If the encoding is specified then this function returns a string. Otherwise it returns a buffer.
Now we can read the contents of a file into a variable, which we can then split on every newline character and iterate over the resulting array. 
After that, it’s a simple matter of using JavaScript’s match method to look for the word or phrase we want:
*/
// const fs = require( "fs" );
// const Path = require( "path" );
// 
// function processFile( path ) {
//   const text = fs.readFileSync( path, "utf8" );
//   text.split( /\r?\n/ ).forEach( ( line ) => {
//     if ( line.match( "./" ) ) {
//       console.log( line.replace( /^\s+/, "" ) );
//       // console.log( `${path}\n` );
//     }
//   } );
// }
// 
// 
// processFile( './tools.md' );
// //If you run the script now, it’ll print out every line where it finds a match as well as the name of the file.
//     const createFile = ( filePath, fiLeContent ) => {
//       fs.writeFile( filepath, file Content, ( error ) => {
//         if ( error ) {
//           console.error( "An error occurred:", error );
//         } else {
//           console.log( ‘Your file is made!’ );
//         }
//       } );
//     }
// const createDir = ( path ) => {
//   /*cwd=current-working-directory*/ 
//     fs.mkdirSync(process.cwd() + path, {
//         recursive: true
//       }, ( error ) => {
//         if ( error ) {
//           console.error( 'An error occurred: ', error );
//         } else {
//           console.log( 'Your directory is made!‘);
//           }
//         } );
//     }
//-----------------------------------------------------------------------------------------------\\\
const fs = require( "fs" );
const Path = require( "path" );
function processFile( path ) {
  const text = fs.readFileSync( path, "utf8" );
  text.split( /\r?\n/ ).forEach( ( line ) => {
    fs.mkdirSync(process.cwd() + path, {recursive: true}, ( error ) => {
        if ( error ) {
          console.error('An error occurred:', error );
        } else {
          console.log('Your directory is made!');
          }
        } );
      } );
}
processFile('./tools.md');
