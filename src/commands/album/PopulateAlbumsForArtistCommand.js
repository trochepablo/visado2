const Command = require('../Command');

class PopulateAlbumsForArtistCommand extends Command {
    async execute(args) {
        //const params = this.paramsBuilder(args);
        await this.unqfy.populateAlbumsForArtist(args);
    }
}

module.exports = PopulateAlbumsForArtistCommand;
