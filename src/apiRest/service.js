const unq = require('../../unqfy');
const express = require('express');
const badRequest = require('./errors/BadRequestError');
const duplicateArtist = require('./errors/DuplicateArtistError');
const nonExistentArtist = require('./errors/NonExistentArtistError'); 
const duplicateAlbumError = require('./errors/DuplicateAlbumError');
const nonExistentPlaylist = require('./errors/NonExistenPlaylistError');
const nonExistentTrackForAddPlaylist = require('./errors/NonExistentTrackForAddPlaylistError')
const nonExistentArtistForAddAlbumError = require('./errors/NonExistentArtistForAddAlbumError');
const nonExistentAlbumError = require('./errors/NonExistentAlbumError');
const theSongYouAreLookingForDoesNotExist = require('./errors/TheSongYouAreLookingForDoesNotExistError')
const rootApp = express();
const artists = express();
const albums = express();
const tracks = express();
const playlists = express();
const users = express();
const bodyParse = require('body-parser');
const Playlist = require('../entity/Playlist');
const port = process.env.PORT || 8083;
const unqfy = new unq.UNQfy();


function valid(data, expectedKeys) {
    return Object.keys(expectedKeys).every(key =>{
        return (typeof data[key]) === expectedKeys[key];
    });

}

function checkValidInput(data, expectedKeys,res) {
    if (!valid(data, expectedKeys)) {
        throw new badRequest(res).exception();
    }
}

function invalidJsonHandler(err, req, res, next) {
    if (err) {
        throw new badRequest(res).exception();
    }
}

function errorHandler(error, req, res, next) {

   // if (error instanceof Error) {

        //res.status(error.status);
        //res.json({ status: error.status, errorCode: error.errorCode });
     //   throw error
    //} else {
        res.status(500);
        res.json({ status: 500, errrorCode: 'INTERNAL_SERVER_ERROR' })
   // }

}

artists.post('/artists', (req, res) => {

    checkValidInput(req.body, { name: 'string', country: 'string' }, res);

    let artist = null;
    try {
        artist = req.unqfy.addArtist(req.body);
    } catch (error) {
        throw new duplicateArtist(error, res).exception();
    }

    req.unqfy.save();
    res.status(201).json(artist);
});


artists.get('/artists/:artistId', (req, res) => {
    const artistId = parseInt(req.params.artistId);

    const artist = req.unqfy.getArtistById(artistId);

    if (!artist) {
        throw new nonExistentArtist(res).exception();
    }

    res.status(200).json(artist);
});


artists.put('/artists/:artistId', (req, res) => {
    const artistId = parseInt(req.params.artistId);

    checkValidInput(req.body, { name: 'string', country: 'string' },res)

    let artist = null;
    try {
        artist = req.unqfy.updateArtist(artistId, req.body);
    } catch (error) {
        throw new nonExistentArtist(error, res).exception();
    }

    req.unqfy.save();
    res.status(200).json(artist);
});


artists.delete('/artists/:artistId', (req, res) => {
    const artistId = parseInt(req.params.artistId);

    const artist = req.unqfy.getArtistById(artistId);

    if (!artist) {
        throw new nonExistentArtist(res).exception();
    }

    req.unqfy.removeArtist(artistId);
    req.unqfy.save();
    res.status(204).json({ message: `delete artist:${artist.getId()}` });
});

artists.get('/artists', (req, res) => {
    const name = req.query.name || '';
    res.status(200).json(req.unqfy.getArtistsByName(name));
});

albums.post('/albums', (req, res) => {

    checkValidInput(req.body, { artistId: 'number', name: 'string', year: 'number'},res);

    const params = req.body;
    const albumParam = { name: params.name, year: params.year };
    const existArtist = req.unqfy.getArtistById(params.artistId);
    const existAlbum = req.unqfy.isThereAlbumInModel(params.name);

    if (!existArtist) {
        throw new nonExistentArtistForAddAlbumError(res).exception();
    }
    if (existAlbum) {
        throw new duplicateAlbumError(res).exception();
    }
    else {
        const newAlbum = req.unqfy.addAlbum(params.artistId, albumParam);
        req.unqfy.save();
        res.status(201).json(newAlbum);
    }
});

albums.get('/albums/:albumId', (req, res) => {
    const albumId = parseInt(req.params.albumId);
    const album = req.unqfy.getAlbumById(albumId);
    if(!album) {
        throw new nonExistentAlbumError(res).exception();
    }
    res.status(200).json(album);
});

albums.patch('/albums/:albumId', (req, res) => {
    const albumId = parseInt(req.params.albumId);
    const album = req.unqfy.getAlbumById(albumId);
    album.year = req.body.year;
    const artist = req.unqfy.getArtistToAlbum(album.id);
    req.unqfy.updateAlbum(artist.id, album);
    req.unqfy.save();
    res.status(200).json(album);
});

albums.delete('/albums/:albumId', (req, res) => {
    const albumId = parseInt(req.params.albumId);
    const album = req.unqfy.getAlbumById(albumId);

    if (!album) {
        throw new nonExistentAlbumError(res).exception();
    }

    req.unqfy.removeAlbum(albumId);
    req.unqfy.save();
    res.status(204).json({ message: `delete artist:${albumId}` });
});

albums.get('/albums', (req, res) => {
    const nameQueryParam = req.query.name || '';
    const albums = req.unqfy.filterAlbumsByName(nameQueryParam);
    res.status(200).json(albums);
});

tracks.get('/tracks/:trackId/lyrics', (req, res) => {
    const trackId = parseInt(req.params.trackId);
    console.log(req.params.trackId);
    let lyrics = null;
    
    try {
        lyrics = req.unqfy.getLyrics(trackId);
    } catch(error) {
       throw new theSongYouAreLookingForDoesNotExist(res).exception();   
    }

    res.status(200).json({ Name: trackId, lyrics: lyrics });
});

playlists.post('/playlists', (req, res) => {
    //checkValidInput(req.body, { id: 'number', name: 'string', duration: 'number', genres: 'string' },res);
    let newPlaylist = null;

    if(Object.entries(req.body).length === 3) {
       newPlaylist = req.unqfy.createPlaylist(req.body.name,req.body.genres,parseInt(req.body.maxDuration));
    
    } else {
       newPlaylist = req.unqfy.createPlaylistForIdTracks(req.body);
    }

    try {
        req.unqfy.addPlaylist(newPlaylist);
    } catch (error) {
        throw new nonExistentTrackForAddPlaylist(res).exception();
    }

    req.unqfy.save();
    res.status(200).json(newPlaylist);
});



playlists.get('/playlists/:playlistId', (req, res) => {
    const playlistId = parseInt(req.params.playlistId);
    console.log(playlistId)
    const playlist = req.unqfy.getPlaylistById(playlistId);
 
    if (!playlist) {
        throw new nonExistentPlaylist(res).exception();
    }
  
    res.status(200).json(JSON.parse(playlist));
});


playlists.delete('/playlists/:playlistId', (req, res) => {
    const playlistId = parseInt(req.params.playlistId);

    try {
        req.unqfy.removePlaylist(playlistId);
    } catch (error) {
        throw new nonExistentPlaylist(res).exception();
    }

    req.unqfy.save();
    res.status(204).json({ message: `delete playlist:${playlistId}` });
});

playlists.get('/playlists', (req, res) => {
    const name = req.query.name || '';
    const durationLT = parseInt(req.query.durationLT);
    const durationGT = parseInt(req.query.durationGT);
    res.status(200).json(req.unqfy.searchPlaylist(name, durationLT, durationGT));
});

rootApp.use((req, res, next) => {
    req.unqfy = unqfy.getUNQfy();
    next();
});

rootApp.use(bodyParse.urlencoded({ extended: true }));
rootApp.use(bodyParse.json());
rootApp.use(invalidJsonHandler);
rootApp.use('/api', artists, albums, tracks, playlists, users);

rootApp.use((req, res) => {
    res.status(404);
    res.json({ status: 404, errorCode: 'RESOURCE_NOT_FOUND' });
});
rootApp.use(errorHandler);

rootApp.listen(port, () => console.log('Listening on ' + port));