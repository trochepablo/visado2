const Command = require('../Command');

class RemoveAlbumCommand extends Command {
    execute(args) { 
        const params = this.paramsBuilder(args);
        const id = params.id;
        this.unqfy.removeAlbum(id);
    }
 }

module.exports = RemoveAlbumCommand;