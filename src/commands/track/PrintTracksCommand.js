const Command = require('../Command');

class PrintTracksCommand extends Command {
    execute(args) { 
        const params = this.paramsBuilder(args);
        const string = params.name;
        this.unqfy.printTracksFor(string);
    }
 }

module.exports = PrintTracksCommand;
