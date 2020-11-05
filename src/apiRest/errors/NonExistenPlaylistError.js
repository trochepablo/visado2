class NonExistenPlaylistError extends Error {
    constructor() {
        super("Non Existen Playlist Error");
        this.status = 409;
        this.errorCode = 'RESOURCE_ALREADY_EXISTS';
    }
}

module.exports = NonExistenPlaylistError;