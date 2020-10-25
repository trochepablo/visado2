const Command = require('../Command');

class AddTrackCommand extends Command {
    execute(args) {
        const params = this.paramsBuilder(args);
        const albumId = params.id;
        const trackData = { name: params.name, duration: params.duration, album: params.album, genres: params.genres };
        this.unqfy.addTrack(albumId, trackData);
    }
}

module.exports = AddTrackCommand;
