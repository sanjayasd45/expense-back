class ExpressError extends Error {
    constructor(
        status = 500, 
        message = "something went wrong",
        errors = [],
        stack = ""
        
        ) {
        super(message)
        this.status = status;
        this.message = message;
        this.data = null;
        this.success = false;
        this.errors = errors
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

module.exports = ExpressError