const rp = require('request-promise');

const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
let options = {
    uri: BASE_URL,
    qs: {
        apikey: '34d23db08e5454c8921a817389b8cf19',
    },
    json: true // Automatically parses the JSON string in the response
};

rp.get(
    options.uri = options.uri + `/track.lyrics.get?track_id=15953433`  //track.lyrics.get?track_id=${id}
).then((response) => {
    var header = response.message.header;
    var body = response.message.body;
    if (header.status_code !== 200) {
        throw new Error('status code != 200');
    }
    console.log(body.lyrics.lyrics_body);
    var lyrics = body.lyrics.lyrics_body;
    console.log(lyrics);
    return lyrics;
}).catch((error) => {
    console.log('algo salio mal', error);
});



rp.get(
    options.uri = options.uri+`/track.search?q_track=%22Nothing%20Else%20Matters%22` // `/track.search?q_track=${string}`
).then((response) => {
    console.log(options.uri);
    //var header = response.message.header;
    var body = response.message.body;
    if (header.status_code !== 200) {
        throw new Error('status code != 200');
    }
    console.log(body);
    var lyrics = body;
    console.log(lyrics);
    return lyrics;
}).catch((error) => {
    console.log('algo salio mal', error);
});
