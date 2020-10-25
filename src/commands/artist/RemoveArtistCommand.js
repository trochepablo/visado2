const Command = require('../Command');

class RemoveArtistCommand extends Command {
    execute(args) {
        const params = this.paramsBuilder(args);
        const id = params.id;
        this.unqfy.removeArtist(id);
    }
}

module.exports = RemoveArtistCommand;
