class NonExistenArtistError extends Error {

    constructor(res) {
        super();
        this.name = "Non Existen Artist Error";
        this.res = res;
    }


    exception() { 
        this.res.status(404);
        this.res.json({ status: 404, errorCode: "RESOURCE_NOT_FOUND" });
    }  
    
}

module.exports = NonExistenArtistError;