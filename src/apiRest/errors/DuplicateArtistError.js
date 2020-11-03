class DuplicateArtistError extends Error {

    constructor(error,res) {
        super();
        this.name = "Dupliate Artist Error";
        this.error = error;
        this.res = res;
    }

    exception() { 
        this.res.status(409);
        this.res.json({ status: 409, errorCode: "RESOURCE_ALREADY_EXISTS" });
        next(this.error);
    } 
}

module.exports = DuplicateArtistError; 