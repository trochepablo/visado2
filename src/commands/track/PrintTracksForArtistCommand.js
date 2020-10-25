const Command = require('../Command');

class PrintTracksForArtistCommand extends Command {
    execute(args) { 
        const params = this.paramsBuilder(args);
        const name = params.name;
        this.unqfy.printTracksForArtist(name);
    }
 }

module.exports = PrintTracksForArtistCommand;
