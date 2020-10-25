const Command = require('../Command');

class PrintTracksForGenreCommand extends Command {
    execute(args) { 
        const params = this.paramsBuilder(args);
        const name = params.name;
        this.unqfy.printTracksForGenre(name);
    }
 }

module.exports = PrintTracksForGenreCommand;
