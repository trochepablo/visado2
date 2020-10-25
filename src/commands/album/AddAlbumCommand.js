const Command = require('../Command');

class AddAlbumCommand extends Command {
    execute(args) {
        const params = this.paramsBuilder(args);
        const idArtista = params.id;
        const albumData = { name: params.name, year: params.year };
        this.unqfy.addAlbum(idArtista, albumData);
    }
}

module.exports = AddAlbumCommand;
