const Command = require('../Command');

class GetTracksMatchingArtistCommand extends Command {
    execute(args) { 
        this.unqfy.getTracksMatchingArtist(this.paramsBuilder(args));
    }
 }

module.exports = GetTracksMatchingArtistCommand;
