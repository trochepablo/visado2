
class Album {

  constructor(name, year) {
    this.id;
    this.name = name;
    this.year = year;
    this.recordCompany;
    this.duration;
    this.tracks = [];
    this.author;
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

  getYear() {
    return this.year;
  }

  setYear(year) {
    this.year = year;
  }

  getRecordCompany() {
    return this.recordCompany;
  }

  setRecordCompany(recordCompany) {
    this.recordCompany = recordCompany;
  }

  getDuration() {
    return this.duration;
  }

  setDuration(duration) {
    this.duration = duration;
  }

  getTracks() {
    return this.tracks;
  }

  setTrack(track) {
    this.tracks.push(track);
  }

  setTracks(tracks) {
    this.tracks = tracks;
  }

  getAuthor() {
    return this.authors;
  }

  setAuthor(author) {
    this.author = author;
  }

}


module.exports = Album;