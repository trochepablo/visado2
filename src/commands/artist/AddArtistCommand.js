const Command = require('../Command');

class AddArtistCommand extends Command {
    execute(args) { 
        this.unqfy.addArtist(this.paramsBuilder(args));
    }
 }

module.exports = AddArtistCommand;
