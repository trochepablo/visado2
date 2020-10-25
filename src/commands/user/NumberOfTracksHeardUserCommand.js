const Command = require('../Command');

class NumberOfTracksUserCommand extends Command {
    execute(args) {
        const params = this.paramsBuilder(args);
        const id = params.id;
        this.unqfy.userHowManyTracksHaveYouHeard(id);
    }
}

module.exports = NumberOfTracksUserCommand;
