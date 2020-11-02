class BadRequestError extends Error {

    constructor() {
        super();
        this.name = "Bad Request Error";
        this.error = error;
        this.res = res;
    }

    exception() { 
        this.res.status(400);
        this.res.json({ status: 400, errorCode: "BAD_REQUEST" });
        next(this.error);
    }  
    
}

module.exports = BadRequestError;