const unq = require('../../unqfy');
const express = require('express');
const rootApp = express();
const artists = express();
const albums = express();
const tracks = express();
const playlists = express();
const users = express();
const SAVE_FILENAME = 'data.json';
const router = express.Router();
const bodyParse = require('body-parser');
const { json } = require('express');
const port = process.env.PORT || 8083;
const unqfy = new unq.UNQfy();

console.log(unqfy);

artists.post('/artists', function(req,res) {
    console.log(req.body);
    req.unqfy.addArtist(req.body);
    req.unqfy.save();
    res.status(201).json({message: `the artist: ${req.body.name} has been successfully created`});
    
});

artists.get('/artists/artistId', function(req,res) {
    console.log("GET");
    const artistId = res.params.artistId;
    console.log(unqfy.getArtistById(artistId));
    res.status(200).json({artist: unqfy.getArtistById(artistId).name});
  
});

artists.put('/artists/artistId', function(req,res) {
    console.log("PUT");
    const artistId = res.params.artistId;
    //unqfy.
    res.status(204).json({message: `the artist: ${req.body.name} has been successfully updated`});
  
});


artists.delete('/artists/artistId', function(req,res) {
    console.log("DELETE");
    const artistId = res.params.archivoId;
    unqfy.removeArtist(artistId);
    res.status(204).json({message: `delete artist:${artistId}`})
  
});

albums.post('/albums', (req, res) => {
    const params = req.body;
    const albumParam = { name: params.name, year: params.year };
    const newAlbum = unqfy.addAlbum(params.artistId, albumParam);
    res.status(201).json(JSON.stringify(newAlbum));
})

albums.get('/albums/:albumId', (req, res) => {
    const albumId = req.params['albumId'];
    const album = unqfy.getAlbumById(albumId);
    res.status(200).json(JSON.stringify(album));
})

albums.put('/albums/:albumId', (req, res) => {
    const albumId = req.params['albumId'];
    const album = unqfy.getAlbumById(albumId);
    album.year = req.body.year;
    unqfy.removeAlbum(albumId);
    unqfy.addAlbum(album);
    res.status(200).json(JSON.stringify(album));
})

albums.delete('/albums/:albumId', (req, res) => {
    const albumId = req.params['albumId'];
    unqfy.removeAlbum(albumId);
    res.status(204);
})

albums.get('/albums', (req, res) => {
    const nameQueryParam = req.query.name
    const albums = unqfy.searchAlbumByName(nameQueryParam);
    res.status(200).json(albums);
})

tracks.get('/tracks/:trackId/lyrics', (req, res) => {
    const trackId = req.params['trackId'];
    const lyric = unqfy.searchLyrickByTrackName(trackId);
    res.status(200).json({Name: trackId, lyrics: lyric});
})

rootApp.use((req,res,next) => {
   req.unqfy =  unqfy.getUNQfy();
   next();
});

rootApp.use(bodyParse.urlencoded({ extended: true }));
rootApp.use(bodyParse.json());
rootApp.use('/api', artists,albums,tracks,playlists,users);

// rootApp.use((req,res) => {
//     res.status(404);
//     res.json({status: 404, errorCode: 'RESOURCE_NOT_FOUND'});
// });

rootApp.listen(port, () => console.log('Listening on ' + port));