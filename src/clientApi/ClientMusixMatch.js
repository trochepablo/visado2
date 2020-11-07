const rp = require('request-promise');
const BASE_URL = 'http://api.musixmatch.com/ws/1.1';


class ClientMusixMatch {

    constructor() {
        this.apikey = '34d23db08e5454c8921a817389b8cf19'
    }


    async getLyrics(title) {

        const optionNew = {
            uri: BASE_URL + '/track.lyrics.get',
            qs: {
                apikey: this.apikey,
                track_id: await this.getTrackIdLyrics(title)
            },
            json: true // Automatically parses the JSON string in the response
        };

        return rp.get(
            optionNew
        ).then((response) => {

            const header = response.message.header;
            const body = response.message.body;

            if (header.status_code !== 200) {
                throw new Error(`${header.status_code}: Not Found `);
            }

            const lyrics = body.lyrics.lyrics_body;

            return lyrics;

        }).catch((error) => {
            throw error
        });
    }

    async getTrackIdLyrics(title) {

        const optionNew = {
            uri: BASE_URL + '/track.search',
            qs: {
                apikey: this.apikey,
                q_track: title
            },
            json: true // Automatically parses the JSON string in the response
        };

        return rp.get(
            optionNew
        ).then((response) => {

            const header = response.message.header;
            const tracks = response.message.body.track_list;

            if (header.status_code !== 200) {
                throw new Error(`${header.status_code}: Not Found`);
            }

            const id = tracks[0].track.track_id;

            return id

        })
            .catch((error) => {
                throw error
            });
    }

}

module.exports = ClientMusixMatch;
