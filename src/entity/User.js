class User {

    constructor(name) {
        this.id;
        this.name = name;
        this.tracksHeard = [];
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getTracksHeard() {
        return this.trackHeard;
    }

    setTracskHeard(tracksHeard) {
        this.tracksHeard = tracksHeard;
        const t = new Set(this.tracksHeard);
        this.tracksHeard = Array.from(t);
    }

    setTrack(track) {
        this.tracksHeard.push(track);
        const t = new Set(this.tracksHeard);
        this.tracksHeard = Array.from(t);
    }

}

module.exports = User;