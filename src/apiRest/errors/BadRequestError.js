class BadRequestError extends Error {

    constructor(res) {
        super();
        this.name = "Bad Request Error";
        this.res = res;
    }

    exception() { 
        this.res.status(400);
        this.res.json({ status: 400, errorCode: "BAD_REQUEST" });
        
    }  
    
}

module.exports = BadRequestError;