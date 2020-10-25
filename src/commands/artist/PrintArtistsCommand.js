const Command = require('../Command');

class PrintArtistsCommand extends Command {
    execute(args) { 
        const params = this.paramsBuilder(args);
        const string = params.name;
        this.unqfy.printArtistsFor(string);
    }
 }

module.exports = PrintArtistsCommand;
