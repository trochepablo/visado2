const unq = require('../../unqfy');
const express = require('express');
const badRequest = require('./errors/BadRequestError');
const duplicateArtist = require('./errors/DuplicateArtistError');
const nonExistentArtist = require('./errors/NonExistentArtistError');
const nonExistentPlaylist = require('./errors/NonExistentPlaylistError');
const rootApp = express();
const artists = express();
const albums = express();
const tracks = express();
const playlists = express();
const users = express();
const bodyParse = require('body-parser');
const port = process.env.PORT || 8083;
const unqfy = new unq.UNQfy();


function valid(data, expectedKeys) {
    return Object.keys(expectedKeys).every(key =>{
        typeof (data[key] === expectedKeys[key]);
        console.log(data[key],expectedKeys[key])
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

    if (error instanceof Error) {

        //res.status(error.status);
        //res.json({ status: error.status, errorCode: error.errorCode });
        throw error
    } else {
        console.log("ELSE");
        res.status(500);
        res.json({ status: 500, errrorCode: 'INTERNAL_SERVER_ERROR' })
    }
    console.log("Termino");

}

artists.post('/artists', (req, res) => {

    checkValidInput(req.body, { name: 'string', country: 'string' },res)

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
        artist = req.unqfy.updateArtist(req.body);
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
    const params = req.body;
    const albumParam = { name: params.name, year: params.year };
    const newAlbum = req.unqfy.addAlbum(params.artistId, albumParam);
    req.unqfy.save();
    res.status(201).json(newAlbum);
});

albums.get('/albums/:albumId', (req, res) => {
    const albumId = parseInt(req.params.albumId);
    const album = req.unqfy.getAlbumById(albumId);
    res.status(200).json(album);
});

albums.put('/albums/:albumId', (req, res) => {
    const albumId = parseInt(req.params.albumId);
    const album = req.unqfy.getAlbumById(albumId);
    album.year = req.body.year;
    req.unqfy.removeAlbum(albumId);
    const artist = req.unqfy.getArtistToAlbum(album.id);
    req.unqfy.addAlbum(artist.id, album);
    req.unqfy.save();
    res.status(200).json(album);
});

albums.delete('/albums/:albumId', (req, res) => {
    const albumId = parseInt(req.params.albumId);
    req.unqfy.removeAlbum(albumId);
    req.unqfy.save();
    res.status(204).json({ message: `delete artist:${albumId}` });
});

albums.get('/albums', (req, res) => {
    const nameQueryParam = req.query.name;
    const albums = req.unqfy.searchAlbumByName(nameQueryParam);
    res.status(200).json(albums);
});

tracks.get('/tracks/:trackId/lyrics', (req, res) => {
    const trackId = req.params.trackId;
    const lyric = unqfy.searchLyrickByTrackName(trackId);
    res.status(200).json({ Name: trackId, lyrics: lyric });
});

playlists.post('/playlists', (req, res) => {
    checkValidInput(req.body, { id: 'int', name: 'string', duration: 'int', genres: 'array' },res);

    let track = null;
    track = req.unqfy.getTrackById(this.trackExists(req.body));
    const newPlaylist = req.unqfy.createPlaylistForIdTracks(req.body);

    try {
        req.unqfy.addPlaylist(newPlaylist);
    } catch (error) {
        throw new nonExistentPlaylist(error, res).exception();
    }

    req.unqfy.save();
    res.status(200).json(newPlaylist);
});

playlists.post('/playlists/:artistId', (req, res) => {
    checkValidInput(req.body, { id: 'int', name: 'string', duration: 'int', tracks: 'array' },res);

    let track = null;
    track = req.unqfy.getTrackById(this.trackExists(req.body));
    const newPlaylist = req.unqfy.createPlaylistForIdTracks(req.body);

    try {
        req.unqfy.addPlaylist(newPlaylist);
    } catch (error) {
        throw new nonExistentPlaylist(error, res).exception();
    }

    req.unqfy.save();
    res.status(200).json(newPlaylist);
});

playlists.get('/playlists/:playlistId', (req, res) => {
    const playlistId = parseInt(req.params.playlistId);

    const playlist = req.unqfy.getPlaylistById(playlistId);
    console.log(playlistId);
    console.log(playlist);
    if (!playlist) {
        throw new nonExistentPlaylist(res).exception();
    }

    res.status(200).json(playlist);
});


playlists.delete('/playlists/:playlistId', (req, res) => {
    const playlistId = parseInt(req.params.playlistId);

    const playlist = req.unqfy.getPlaylistById(playlistId);

    try {
        req.unqfy.removePlaylist(playlistId);
    } catch (error) {
        throw new nonExistentPlaylist(error, res).exception();
    }
    req.unqfy.save();
    res.status(204).json({ message: `delete playlist:${playlistId}` });
});

playlists.get('/playlists', (req, res) => {
    const name = req.query.name || '';
    const durationLT = parseInt(req.query.durationGT);
    const durationGT = parseInt(req.query.durationGT);
    const params = { name: name, durationGT: durationGT, durationLT: durationLT };
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