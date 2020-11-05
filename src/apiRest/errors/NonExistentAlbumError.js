class NonExistentAlbumError extends Error {
    constructor() {
        super("Non Existen Artist Error");
        this.status = 404;
        this.errorCode = 'RESOURCE_NOT_FOUND';
    }
}

module.exports = NonExistentAlbumError;