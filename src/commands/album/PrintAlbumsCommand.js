const Command = require('../Command');

class PrintAlbumsCommand extends Command {
    execute(args) { 
        const params = this.paramsBuilder(args);
        const string = params.name;
        this.unqfy.printAlbumsFor(string);
    }
 }

module.exports = PrintAlbumsCommand;
