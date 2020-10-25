const Command = require('../Command');

class ListAlbumsCommand extends Command {
    execute() { 
        this.unqfy.printAlbums();
    }
 }

module.exports = ListAlbumsCommand;
