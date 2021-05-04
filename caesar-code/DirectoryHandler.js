const path          = require( 'path' ) ;
const fs            = require( 'fs' );
const StringStream  = require( 'stream' );

const { CaesarEncoder } = require( './CaesarEncoder' );
const { Logger }        = require( './Logger' );

class DirectoryHandler  extends Logger
{
    constructor( Encoder, fileIn, fileOut ) {
        super();
        
        this.encoder   = Encoder;
        this.encoderFn = null;
        this.encoderFnParams = null;

        this.logShow = true;

        this.dir       = path.join( __dirname, 'files' ) + path.sep;
        this.fileIn    = this.dir + fileIn;
        this.fileOut   = this.dir + fileOut;
    }

    encode() {
        this.encoderFn = 'encode';

        return this;
    }

    decode() {
        this.encoderFn = 'decode';

        return this;
    }

    textGet() {
        let rs = fs.createReadStream( this.fileIn );
        let ws = fs.createWriteStream( this.fileOut );

        let Transform   = require('stream').Transform;
        let transformer = new Transform();
        let Source      = this;

        transformer._transform = function( chunk, encoding, cb ) {
            this.push( Source.encoder[ Source.encoderFn ]( chunk.toString() ) );

            cb();
        };

        rs
            .pipe( transformer )
            .pipe( ws );

        /*      ....Not work....
            fs.createReadStream('input/file.txt')
            .pipe(new StringStream('utf-8'))
            .split('\n')                                          
            .map(async (line) => await makeYourChangesTo(line))   // modify
            .join('\n')                                           
            .pipe(fs.createWriteStream('output/file.txt'))
        */
    }

    /**
     * 
     * @param {String} line 
     * @returns 
     */
    async makeYourChangesTo( line ) {
        return line.toUpperCase();
    }
}

module.exports = { DirectoryHandler };