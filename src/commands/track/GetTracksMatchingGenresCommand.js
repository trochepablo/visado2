const Command = require('../Command');

class GetTracksMatchingGenresCommand extends Command {
    execute(args) { 
        this.unqfy.getTracksMatchingGenres(this.paramsBuilder(args));
    }
 }

module.exports = GetTracksMatchingGenresCommand;
