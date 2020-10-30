const Command = require('../Command');

class PopulateAlbumsForArtistCommand extends Command {
    execute(args) {
        //const params = this.paramsBuilder(args);
        this.unqfy.populateAlbumsForArtist(args);
    }
}

module.exports = PopulateAlbumsForArtistCommand;
