const { pipeline }  = require('stream');
const path          = require( 'path' ) ;
const fs            = require( 'fs' );
const Transform     = require('stream').Transform;
const yargs         = require('yargs/yargs')
const { hideBin }   = require('yargs/helpers')

const { CaesarEncoder }  = require('./CaesarEncoder');

class CommandLineHandler
{
    constructor() {
        /**
         * @type {CaesarEncoder}
         */

        this.CaesarEncoder    = null;
        /**
         * @type {Transform}
         */
        this.Transformer      = null;

        /**
         * @type {string}
         */
        this.filePath = __dirname + '/files/';

        /**
         * @type {{shift: null, action: null, fileIn: null, fileOut: null, argv: null}}
         */
        this.data = {
            shift   : null,
            action  : null,
            fileIn  : null,
            fileOut : null,
            argv    : null,
        };

        this
            .init()
            .action();
    }

    action() {
        pipeline(
            this.data.fileIn(),
            this.Transformer,
            this.data.fileOut(),
            (err) => {
                if (err) {
                    this.riseError( err )
                }
                else {
                    //console.log( 'ok - succeeded' );
                }
            }
        );
    }

    /**
     * @returns {CommandLineHandler}
     */
    init() {
        this.argv = yargs(hideBin(process.argv)).argv;

        this
            .setAction()
            .setShift()
            .setFileIn()
            .setFileOut()
            .setTransformer();

        this.CaesarEncoder = new CaesarEncoder( this.data.shift );

        return this;
    }

    /**
     * @returns {CommandLineHandler}
     */
    setTransformer() {        
        let Source       = this;
        this.Transformer = new Transform();

        this.Transformer._transform = function( chunk, encoding, cb ) {
            // не знаю, как красиво инжектить кодировщик... необходимо спросить
            this.push( 
                Source.CaesarEncoder[ Source.data.action ]( chunk.toString() ) 
            );

            cb();
        };

        return this;
    }

    /**
     * @returns {CommandLineHandler}
     */
    setFileOut() {
        if( this.isNotSet( 'o' )
            && this.isNotSet( 'output' )
        ) {
            this.data.fileOut = () => process.stdout;
        }
        else {
            let fileAbsPath = this.filePath + ( this.argv[ 'o' ] || this.argv[ 'output' ] );

            if ( ! this.isFileExist( fileAbsPath ) ) {
                this.fileCreate( fileAbsPath );
            }

            this.data.fileOut = () => fs.createWriteStream( 
                    fileAbsPath, 
                    { flags : 'a+', encoding : 'utf8' } 
                );
        }

        return this;
    }

    /**
     * @returns {CommandLineHandler}
     */
    setFileIn() {
        if( this.isNotSet( 'i' )
            && this.isNotSet( 'input' )
        ) {
            this.data.fileIn = () => {
                console.log( `\Input your text\n`);

                return process.stdin;
            }    
        }
        else {
            let fileAbsPath = this.filePath + ( this.argv[ 'i' ] || this.argv[ 'input' ] );
            
            if ( ! this.isFileExist( fileAbsPath ) ) {
                this.riseError( 'Input file is not exists - ${fileAbsPath}' );
            }

            this.data.fileIn = () => fs.createReadStream( 
                    fileAbsPath, 
                    { flags : 'r', encoding : 'utf8' }  
                );        
        }

        return this;
    }

    /**
     * @returns {CommandLineHandler}
     */
    setAction() {
        if( this.isNotSet( 'a' )
            && this.isNotSet( 'action' )
        ) {
            this.riseError( 'Error (action) - is require (--action decode or -a=encode)' );
        }  

        this.data.action = this.argv[ 'a' ] || this.argv[ 'action' ];

        return this;
    }

    /**
     * @returns {CommandLineHandler}
     */
    setShift() {
        if( this.isNotSet( 's' ) 
            && this.isNotSet( 'shift' )
        ) {
            this.riseError( 'Error (shift) - is require (--shift -22 or -s=15)' );
        }

        this.data.shift = this.argv[ 's' ] || this.argv[ 'shift' ];

        return this;
    }

    /**
     * @param   {string} varName
     * @returns {boolean}
     */
    isNotSet( varName ) {
        let tmp = `${varName} - ${typeof this.argv[ varName ]}`;

        return 'undefined' === typeof this.argv[ varName ];
    }

    /**
     * @param  {string|Error} errorData
     * @param  {number} [errorCode=11]
     * @return
     */
    riseError( errorData, errorCode = 11 ) {
        console.error(
            errorData instanceof Error ?
                errorData.message :
                errorData
        );

        process.exit( errorCode );

        return;  // throw new Error( message );
    }

    /**
     * @param {string} fileAbsPath
     * @returns {boolean}
     */
    isFileExist( fileAbsPath ) {
        return fs.existsSync( fileAbsPath );
    }

    /**
     *
     * @param {string} fileAbsPath
     * @throws 
     */
    fileCreate( fileAbsPath ) {
        try {
            let dirName = path.dirname( fileAbsPath );

            if( ! fs.existsSync( dirName ) ) {
                fs.mkdirSync( dirName, { recursive: true, mode: 0o755 } );
            }

            fs.writeFileSync( fileAbsPath, '' );
        }
        catch( e ) {
            this.riseError( e, 100 );
        }
    }
}

module.exports = { CommandLineHandler };