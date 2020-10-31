/* eslint-disable no-unused-vars */
const fs = require('fs'); // para cargar/guarfar unqfy
const path = require('path');
const pathCreds = './src/oAuthService';
const rp = require('request-promise');
const BASE_URL = 'https://api.spotify.com/v1/';

class SpotifyCliente {
    constructor() {
        this.options = this.getOptionsRequest();
    }

    getOptionsRequest() {
        const creds = JSON.parse(fs.readFileSync(path.resolve(pathCreds, 'spotifyCreds.json'), { encoding: 'utf-8' }));
        const options = {
            url: null, 
            headers: { Authorization: 'Bearer ' + creds.access_token }, 
            json: true
        };
        return options;
    }

    async getAlbumsArtistByName(artistName) {
        const artist = await this.searchArtistByName(artistName);
        artist.albums = await this.getAlbumsByArtistId(artist.id);
        return artist.albums;
    }

    async searchArtistByName(artistName) {
        this.options.url = BASE_URL + `search?query=${artistName}&type=artist&offset=0&limit=1`;
        return rp.get(this.options).then(response => response.artists.items.shift());
    }

    async getAlbumsByArtistId(artistId) {
        this.options.url = BASE_URL + `artists/${artistId}/albums`;
        return rp.get(this.options).then(response => response.items);
    }
}

module.exports = {
    SpotifyCliente: SpotifyCliente,
};