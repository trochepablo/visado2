const rp = require('request-promise');

const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
let options = {
    uri: BASE_URL,
    qs: {
        apikey: '34d23db08e5454c8921a817389b8cf19',
    },
    json: true // Automatically parses the JSON string in the response
};

function getLyrics(id) {
   options.uri = options.uri + `/track.lyrics.get?track_id=${id}`;
   
   rp.get( 
       options
   ).then((response) => {
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

function getIdTrack(title) {
  
  options.uri = options.uri + `/track.search?q_track=${title}`;

   rp.get(options 
   ).then((response) => {
      //var header = response.message.header;
      let body = response.message.body;
      if (header.status_code !== 200) {
        throw new Error('status code != 200');
      }
      console.log(body);
      let lyrics = body;
      console.log(lyrics);
      return lyrics;
   }).catch((error) => {
      console.log('algo salio mal', error);
   });
}