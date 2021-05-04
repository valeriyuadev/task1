class CaesarEncoder 
{
    /** 
     * @protected {Array} charsLatin 
     */

    /** 
     * @protected {Array} charsLatinEncoded 
     */

    /** 
     * @protected {number} shift 
     */

    /**
     * @protected {number} shift 
     */

    /**
     * 
     * @param {number} shift 
     */
    constructor( shift ) {
        this.shift = parseInt( shift ) || 1;
        this.AZ    = [ 65, 90 ];   // A...Z
        this.az    = [ 97, 122 ];  // a...z

        this.charsLatin = [
            ...this.range( ...this.AZ ),   
            ...this.range( ...this.az ),  
        ];

        this.charsLatinEncoded = this.getCharsShifted();
    }
    /***************************************************************** */

    /**
     * 
     * @param {number} start 
     * @param {number} end 
     * @returns {Array}
     */
    range( start, end ) {
        let tmp = [];
        
        for( let i = start; i <= end; i += 1 ) {
            tmp.push( String.fromCharCode( i ) );
        }
        
        return tmp;
    }

    /**
     * 
     * @param {Array} data 
     * @param {number} shift 
     * @returns {Array}
     */
    getCharsShifted() {
        let data  = [ ...this.charsLatin ];
        let shift = parseInt( this.shift );
        
        let start  = shift < 0 ? shift : 0;
        let length = Math.abs( shift );
        let tail   = data.splice( start, length );

        if( shift < 0 ) {
            return tail.concat( data );
        }
        
        return data.concat( tail );

        if( shift < 0 ) {
            data = tail.concat( data );
        }
        else {
            data = data.concat( tail );
        }

        return data;
    }

    /***************************************************************** */
    /**     
     * @param {String} text 
     * @returns {String}
     */
    encode( text, isEncodeMode = true ) {
        let textOrigin  = text.split( '' );
        let textEncoded = [];

        let charsFrom = isEncodeMode ? 
                            this.charsLatin : 
                            this.charsLatinEncoded;
        let charsTo   = isEncodeMode ? 
                            this.charsLatinEncoded : 
                            this.charsLatin;
        
        for( let char of textOrigin ) {
            let index   = charsFrom.findIndex( el => el === char );

            if( -1 != index ) {
                char = charsTo[ index ];
            }

            textEncoded.push( char );
        }

        return textEncoded.join( '' );
    }

    /**
     * 
     * @param {String} text 
     * @returns 
     */
    decode( text ) {
        return this.encode( text, false );
    }
    /***************************************************************** */

    getConfigs() {
        return {
            charsLatin:        this.charsLatin,
            charsLatinEncoded: this.charsLatinEncoded,
            shift:             this.shift,            
        };
    }
}

module.exports = { CaesarEncoder };
//export { CaesarEncoder };