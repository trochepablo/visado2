const Command = require('../Command');

class GetPlaylistByIdCommand extends Command { 
    execute(args) { 
        this.unqfy.getPlaylistById(this.paramsBuilder(args));
    }
}

module.exports = GetPlaylistByIdCommand;
