const Command = require('../Command');

class GetArtistByIdCommand extends Command {
    execute(args) { 
        this.unqfy.getArtistById(this.paramsBuilder(args));
    }
}

module.exports = GetArtistByIdCommand;
