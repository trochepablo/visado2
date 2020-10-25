const Command = require('../Command');

class RemoveTrackCommand extends Command {
    execute(args) {
        const params = this.paramsBuilder(args);
        const id = params.id;
        this.unqfy.removeTrack(id);
    }
}

module.exports = RemoveTrackCommand;
