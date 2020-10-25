const Command = require('../Command');

class ListPlaylistsCommand extends Command {
    execute() { 
        this.unqfy.printPlaylists();
    }
}

module.exports = ListPlaylistsCommand;
