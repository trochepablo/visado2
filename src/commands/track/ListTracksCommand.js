const Command = require('../Command');

class ListTracksCommand extends Command {
    execute() {
        this.unqfy.printTracks();
    }
}

module.exports = ListTracksCommand;
