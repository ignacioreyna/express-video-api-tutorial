class Logger {

    constructor() {
        this.env = process.env.ENV || 'dev'
    }

    info(msg){
        if(this.env === 'dev')
            console.log(msg);
    }

    error(err){
        if(this.env === 'dev')
            console.error(err);
    }
}

module.exports = new Logger();