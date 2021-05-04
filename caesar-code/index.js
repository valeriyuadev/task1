const { CaesarEncoder } = require('./CaesarEncoder');

const objCaesarEncoder = new CaesarEncoder( -15 );  

let textLatin   = "Hello, World!";
let textEncoded = objCaesarEncoder.encode( textLatin );
let textDecode  = objCaesarEncoder.decode( textEncoded );

/***************************************************************** */
console.log( objCaesarEncoder.getConfigs() );
console.log( textLatin );
console.log( textEncoded );
console.log( textDecode );
/***************************************************************** */