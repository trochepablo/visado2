class TheSongYouAreLookingForDoesNotExistError extends Error {
    constructor() {
        super("The Song You Are Looking For Does Not Exist Error");
        this.status = 404;
        this.errorCode = 'RESOURCE_NOT_FOUND';
    }
}

module.exports = TheSongYouAreLookingForDoesNotExistError;