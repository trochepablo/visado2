const Command = require('../Command');

class GetLyricsCommand extends Command {
    execute(args) { 
        const id = parseInt(args[0]);
        this.unqfy.getLyrics(id);
    }
}

module.exports = GetLyricsCommand;
