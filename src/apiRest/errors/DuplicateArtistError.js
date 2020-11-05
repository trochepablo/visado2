class DuplicateArtistError extends Error {
    constructor() {
        super("Dupliate Artist Error");
        this.status = 409;
        this.errorCode = 'RESOURCE_ALREADY_EXISTS';
    }
}

module.exports = DuplicateArtistError; 