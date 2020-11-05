class NonExistentArtistForAddAlbumError extends Error {
    constructor() {
        super("Non Existen Artist Error");
        this.status = 404;
        this.errorCode = 'RELATED_RESOURCE_NOT_FOUND';
    }
}

module.exports = NonExistentArtistForAddAlbumError;