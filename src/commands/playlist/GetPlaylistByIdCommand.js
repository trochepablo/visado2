const Command = require('../Command');

class GetPlaylistByIdCommand extends Command { 
    execute(args) { 
        const id = parseInt(args[0]);
        this.unqfy.getPlaylistById(id);
    }
}

module.exports = GetPlaylistByIdCommand;
