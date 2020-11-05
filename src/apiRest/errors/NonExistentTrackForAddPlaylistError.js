class NonExistentTrackForAddPlaylistError extends Error {
    constructor() {
        super("NonExistentTrackForAddPlaylistError");
        this.status = 404;
        this.errorCode = 'RELATED_RESOURCE_NOT_FOUND';
    } 
}

module.exports = NonExistentTrackForAddPlaylistError;