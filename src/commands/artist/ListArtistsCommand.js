const Command = require('../Command');

class ListArtistsCommand extends Command {
    execute() { 
        this.unqfy.printArtists();
    }
 }

module.exports = ListArtistsCommand;
