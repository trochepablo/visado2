/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const unq = require('../../unqfy');
const express = require('express');
const errors = require('./errors/index');
const badRequest = require('./errors/BadRequestError');
const duplicateArtist = require('./errors/DuplicateArtistError');
const nonExistentArtist = require('./errors/NonExistentArtistError');
const duplicateAlbumError = require('./errors/DuplicateAlbumError');
const nonExistentPlaylist = require('./errors/NonExistenPlaylistError');
const nonExistentTrackForAddPlaylist = require('./errors/NonExistentTrackForAddPlaylistError')
const nonExistentArtistForAddAlbumError = require('./errors/NonExistentArtistForAddAlbumError');
const nonExistentAlbumError = require('./errors/NonExistentAlbumError');
const theSongYouAreLookingForDoesNotExist = require('./errors/TheSongYouAreLookingForDoesNotExistError');
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
    return Object.keys(expectedKeys).every(key => {
        return (typeof data[key]) === expectedKeys[key];
    });

}

function checkValidInput(data, expectedKeys, res, next) {
    if (!valid(data, expectedKeys)) {
        throw next(new badRequest());
    }
}

function invalidJsonHandler(err, req, res, next) {
    if (err) {
        throw next(new badRequest());
    }
}

function errorHandler(error, req, res, next) {
    const isHandlerError = errors.find(error => error === error);
    if (isHandlerError) {
        res.status(error.status);
        res.json({ status: error.status, errorCode: error.errorCode });
    } else {
        res.status(500);
        res.json({ status: 500, errorCode: "INTERNAL_SERVER_ERROR" });
    }
}

artists.post('/artists', (req, res, next) => {

    checkValidInput(req.body, { name: 'string', country: 'string' }, res, next);

    let artist = null;
    try {
        artist = req.unqfy.addArtist(req.body);
        req.unqfy.save();
        res.status(201).json(artist);
    } catch (error) {
        throw next(new duplicateArtist());
    }
});


artists.get('/artists/:artistId', (req, res, next) => {
    const artistId = parseInt(req.params.artistId);

    const artist = req.unqfy.getArtistById(artistId);

    if (!artist) {
        throw next(new nonExistentArtist());
    }

    res.status(200).json(artist);
});


artists.put('/artists/:artistId', (req, res, next) => {
    const artistId = parseInt(req.params.artistId);

    checkValidInput(req.body, { name: 'string', country: 'string' }, res, next);

    let artist = null;
    try {
        artist = req.unqfy.updateArtist(artistId, req.body);
        req.unqfy.save();
        res.status(200).json(artist);
    } catch (error) {
        throw next(new nonExistentArtist());
    }
});


artists.delete('/artists/:artistId', (req, res, next) => {
    const artistId = parseInt(req.params.artistId);
    const artist = req.unqfy.getArtistById(artistId);

    if (!artist) {
        throw next(new nonExistentArtist());
    }
    req.unqfy.removeArtist(artistId);
    req.unqfy.save();
    res.status(204).json({ message: `delete artist:${artist.getId()}` });

});

artists.get('/artists', (req, res, next) => {
    const name = req.query.name || '';
    res.status(200).json(req.unqfy.getArtistsByName(name));
});

albums.post('/albums', (req, res, next) => {

    checkValidInput(req.body, { artistId: 'number', name: 'string', year: 'number' }, res, next);

    const params = req.body;
    const albumParam = { name: params.name, year: params.year };
    const existArtist = req.unqfy.getArtistById(params.artistId);
    const existAlbum = req.unqfy.isThereAlbumInModel(params.name);

    if (!existArtist) {
        throw next(new nonExistentArtistForAddAlbumError());
    }
    else if (existAlbum) {
        throw next(new duplicateAlbumError());
    }

    const newAlbum = req.unqfy.addAlbum(params.artistId, albumParam);
    req.unqfy.save();
    res.status(201).json(newAlbum);

});

albums.get('/albums/:albumId', (req, res, next) => {
    const albumId = parseInt(req.params.albumId);
    const album = req.unqfy.getAlbumById(albumId);
    if (!album) {
        throw next(new nonExistentAlbumError());
    }
    res.status(200).json(album);
});

albums.patch('/albums/:albumId', (req, res, next) => {
    const albumId = parseInt(req.params.albumId);
    const album = req.unqfy.getAlbumById(albumId);
    album.year = req.body.year;
    const artist = req.unqfy.getArtistToAlbum(album.id);
    req.unqfy.updateAlbum(artist.id, album);
    if (artist) {
        req.unqfy.save();
        res.status(200).json(album);
    }
});

albums.delete('/albums/:albumId', (req, res, next) => {
    const albumId = parseInt(req.params.albumId);
    const album = req.unqfy.getAlbumById(albumId);

    if (!album) {
        throw next(new nonExistentAlbumError());
    }
    req.unqfy.removeAlbum(albumId);
    req.unqfy.save();
    res.status(204).json({ message: `delete artist:${albumId}` });

});

albums.get('/albums', (req, res, next) => {
    const nameQueryParam = req.query.name || '';
    const albums = req.unqfy.filterAlbumsByName(nameQueryParam);
    res.status(200).json(albums);
});

async function getLyrics(trackId, req, res, trackName) {
    return await req.unqfy.getLyrics(trackId).then(value => res.status(200).json({
        Name: trackName,
        lyrics: value
    }));
}

tracks.get('/tracks/:trackId/lyrics', (req, res, next) => {
    const trackId = parseInt(req.params.trackId);
    const trackName = req.unqfy.getTrackById(trackId).name;

    try {
        return getLyrics(trackId, req, res, trackName);
    } catch (error) {
        throw next(new theSongYouAreLookingForDoesNotExist());
    }

});

playlists.post('/playlists', (req, res, next) => {
    //checkValidInput(req.body, { id: 'number', name: 'string', duration: 'number', genres: 'string' },res);
    let newPlaylist = null;

    if (Object.entries(req.body).length === 3) {
        newPlaylist = req.unqfy.createPlaylist(req.body.name, req.body.genres, parseInt(req.body.maxDuration));

    } else {
        newPlaylist = req.unqfy.createPlaylistForIdTracks(req.body);
    }

    try {
        req.unqfy.addPlaylist(newPlaylist);
        req.unqfy.save();
        res.status(200).json(newPlaylist);
    } catch (error) {
        throw next(new nonExistentTrackForAddPlaylist());
    }
});



playlists.get('/playlists/:playlistId', (req, res, next) => {
    const playlistId = parseInt(req.params.playlistId);
    const playlist = req.unqfy.getPlaylistById(playlistId);

    if (!playlist) {
        throw next(new nonExistentPlaylist());
    }

    res.status(200).json(JSON.parse(playlist));
});


playlists.delete('/playlists/:playlistId', (req, res, next) => {
    const playlistId = parseInt(req.params.playlistId);

    try {
        req.unqfy.removePlaylist(playlistId);
    } catch (error) {
        throw next(new nonExistentPlaylist());
    }

    req.unqfy.save();
    res.status(204).json({ message: `delete playlist:${playlistId}` });
});

playlists.get('/playlists', (req, res, next) => {
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