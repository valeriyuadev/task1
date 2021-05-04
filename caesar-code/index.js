const { CaesarEncoder }    = require('./CaesarEncoder');
const { DirectoryHandler } = require( './DirectoryHandler');

const objCaesarEncoder    = new CaesarEncoder( -2 );

// encode
const objDirectoryHandler = new DirectoryHandler( objCaesarEncoder, 'in.txt', 'out.txt' );
let data = objDirectoryHandler
                .encode()
                .textGet() ; 
// decode
// const objDirectoryHandler = new DirectoryHandler( objCaesarEncoder, 'out.txt', 'in.txt' );
// let data = objDirectoryHandler
//                 .decode()
//                 .textGet() ; 

/*****************************************************************/
// let textLatin   = "Hello, World!";
// let textEncoded = objCaesarEncoder.encode( textLatin );
// let textDecoded = objCaesarEncoder.decode( textEncoded );

/*****************************************************************/
// console.log( objCaesarEncoder.getConfigs() );
// console.log( textLatin );
// console.log( textEncoded );
// console.log( textDecoded );
/***************************************************************** */

function toLog( data, isOut = true ) {
    if( isOut ) {
        console.log( data );
    }
}