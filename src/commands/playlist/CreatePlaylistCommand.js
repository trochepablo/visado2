const Command = require('../Command');

class CreatePlaylistCommand extends Command {
    execute(args) { 
        const playlistData = this.paramsBuilder(args);
        this.unqfy.createPlaylist(playlistData.name, playlistData.genresToIncludes, playlistData.maxDuration);
    }
}

module.exports = CreatePlaylistCommand;
