const Command = require('../Command');

class GetTrackByIdCommand extends Command {
    execute(args) { 
        const id = parseInt(args[1]);
        this.unqfy.getTrackById(id);
    }
}

module.exports = GetTrackByIdCommand;
