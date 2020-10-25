const Command = require('../Command');

class GetAlbumByIdCommand extends Command {
    execute(args) {
        const id = parseInt(args[1]);
        this.unqfy.getAlbumById(id);
    }
}

module.exports = GetAlbumByIdCommand;
