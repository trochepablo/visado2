const Command = require('../Command');

class UserListensToATrackCommand extends Command {
    execute(args) {
        const params = this.paramsBuilder(args);
        const idUser = params.idUser;
        const idTrack = params.idTrack;
        this.unqfy.userListensToATrack(idUser,idTrack);
    }
}

module.exports = UserListensToATrackCommand;
