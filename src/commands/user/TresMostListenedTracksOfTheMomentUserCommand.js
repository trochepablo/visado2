const Command = require('../Command');

class TresMostListenedTracksOfTheMomentUserCommand extends Command {
    execute() {
        this.unqfy.tresMostListenedTracksOfTheMoment();
    }
}

module.exports = TresMostListenedTracksOfTheMomentUserCommand;
