const rp = require('request-promise');
const BASE_URL = 'http://api.musixmatch.com/ws/1.1';


class ClientMusixMatch {

    constructor() {
        this.options = {
            uri: BASE_URL,
            qs: {
                apikey: '34d23db08e5454c8921a817389b8cf19',
            },
            json: true // Automatically parses the JSON string in the response
        };
    }


    lyrics(id) {
        this.options.uri = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}`;

        rp.get(
            this.options
        ).then((response) => {
            console.log(id);
            //console.log(response);
            let header = response.message.header;
            let body = response.message.body;

            if (header.status_code !== 200) {
                throw new Error('status code != 200');
            }

            let lyrics = body.lyrics.lyrics_body;
            console.log(lyrics);
            return lyrics;
        }).catch((error) => {
            console.log('algo salio mal', error);
        });
    }

    getLyrics(title) {

        this.options.uri = `http://api.musixmatch.com/ws/1.1/track.search?q_track=${title}`;

        rp.get(
            this.options
        ).then((response) => {
            let header = response.message.header;
            let tracks = response.message.body.track_list;

            if (header.status_code !== 200) {
                throw new Error('status code != 200');
            }

            let id = tracks[0].track.track_id;

            return this.lyrics(id);

        })
            .catch((error) => {
                console.log('algo salio mal', error);
            });
    }
   
    getTracksForArtist(id) {

        this.options.uri = `https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${id}`;

        rp.get(
            this.options
        ).then((response) => {
            const header = response.message.header;

            if (header.status_code !== 200) {
                throw new Error('status code != 200');
            }

            const tracks = response.message.body.track_list;

            return tracks;

        })
            .catch((error) => {
                console.log('algo salio mal', error);
            });
    } 

}

module.exports = ClientMusixMatch;
