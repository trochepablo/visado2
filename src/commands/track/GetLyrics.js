const Command = require('../Command');

class GetLyricsCommand extends Command {
    execute(args) { 
        const name = args[1];
        this.unqfy.getLyrics(name);
    }
}

module.exports = GetLyricsCommand;
