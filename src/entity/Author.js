
class Author {

  constructor(name, country) {
    this.id;
    this.name = name;
    this.origin;
    this.yearsActive;
    this.country = country;
    this.webSite;
    this.albums = [];
    this.unqfy;
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

  getOrigin() {
    return this.origin;
  }

  setOrigin(origin) {
    this.origin = origin;
  }

  getYearsActive() {
    return this.yearsActive;
  }

  setYearsActive(yearsActive) {
    this.yearsActive = yearsActive;
  }

  getCountry() {
    return this.country;
  }

  setCountry(country) {
    this.country = country;
  }

  getWebSite() {
    return this.webSite;
  }

  setWebSite(webSite) {
    this.webSite = webSite;
  }

  getAlbums() {
    return this.albums;
  }

  setAlbum(album) {
    this.albums.push(album);
  }

  setAlbums(albums) {
    this.albums = albums;
  }

  getUnqfy() {
    return this.unqfy;
  }

  setUnqfy(unqfy) {
    this.unqfy = unqfy;
  }

}

module.exports = Author;