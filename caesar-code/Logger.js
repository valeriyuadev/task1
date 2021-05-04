class Logger
{
    toLog( data ) {
        if( this.logShow ) {
            console.log( data )
        }
    }
}

module.exports = { Logger };