class NonExistentTrackForAddPlaylistError extends Error {

    constructor(res) {
        super();
        this.name = "NonExistentTrackForAddPlaylistError";
        this.res = res;
    }


    exception() { 
        this.res.status(404);
        this.res.json({ status: 404, errorCode: "RELATED_RESOURCE_NOT_FOUND" });
    }  
}

module.exports = NonExistentTrackForAddPlaylistError;