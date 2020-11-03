class TheSongYouAreLookingForDoesNotExistError extends Error {

    constructor(res) {
        super();
        this.name = "The Song You Are Looking For Does Not Exist Error";
        this.res = res;
    }

    exception() { 
        this.res.status(404);
        this.res.json({ status: 404, errorCode: "RESOURCE_NOT_FOUND" });
    }  
    
}

module.exports = TheSongYouAreLookingForDoesNotExistError;