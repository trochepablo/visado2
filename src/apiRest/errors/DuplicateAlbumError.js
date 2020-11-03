class DuplicateAlbumError extends Error {

    constructor(res) {
        super();
        this.name = "Existe Album Error";
        this.res = res;
    }


    exception() { 
        this.res.status(409);
        this.res.json({ status: 409, errorCode: "RESOURCE_ALREADY_EXISTS" });
    }  
    
}

module.exports = DuplicateAlbumError;