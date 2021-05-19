class Logger
{
    constructor() {
        /**
         * @type {boolean}
         */
        this.logShow = false;
    }
    
    /**
     * @param {*} data
     */
    toLog( data ) {
        if( this.logShow ) {
            console.log( data )
        }
    }
}

module.exports = { Logger };