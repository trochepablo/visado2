class DuplicateAlbumError extends Error {
    constructor() {
        super("Existe Album Error");
        this.status = 409;
        this.errorCode = 'RESOURCE_ALREADY_EXISTS';
    }  
}

module.exports = DuplicateAlbumError;