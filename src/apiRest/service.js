const unq = require('../../unqfy');
const express = require('express');
const rootApp = express();
const artists = express();
const albums = express();
const tracks = express();
const playlists = express();
const users = express();
const bodyParse = require('body-parser');
const port = process.env.PORT || 8083;
const unqfy = new unq.UNQfy();

artists.post('/artists', (req, res) => {
    const artist = req.unqfy.addArtist(req.body);
    req.unqfy.save();
    res.status(201).json(artist);
});


artists.get('/artists/:artistId', (req, res) => {
    const artistId = parseInt(req.params.artistId);
    res.status(200).json(req.unqfy.getArtistById(artistId));
});


artists.put('/artists/:artistId', (req, res) => {
    const artistId = parseInt(req.params.artistId);
    const artist = req.unqfy.updateArtist(artistId, req.body);
    req.unqfy.save();
    res.status(200).json(artist);
});


artists.delete('/artists/:artistId', (req, res) => {
    const artistId = parseInt(req.params.artistId);
    req.unqfy.removeArtist(artistId);
    req.unqfy.save();
    res.status(204).json({ message: `delete artist:${artistId}` });
});

//Consultar
artists.get('/artists', (req, res) => {
    const name = req.query.name;
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
    const track = req.unqfy.addTrack(req.body);
    req.unqfy.save();
    res.status(200).json(track);
});

playlists.post('/playlists/:artistId', (req, res) => {
    const track = req.unqfy.addTrack(req.body);
    req.unqfy.save();
    res.status(200).json(track);
});

playlists.get('/playlists/:playlistId', (req, res) => {
    const playlistId = parseInt(req.params.artistId);
    res.status(200).json(req.unqfy.getPlaylistById(playlistId));
});


playlists.delete('/playlists/:playlistId', (req, res) => {
    const playlistId = parseInt(req.params.artistId);
    req.unqfy.removePlaylist(playlistId);
    req.unqfy.save();
    res.status(204).json({ message: `delete artist:${playlistId}` });
});

playlists.get('/playlists', (req, res) => {
    const name = req.query.name;
    const durationLT = parseInt(req.query.durationGT);
    const durationGT = parseInt(req.query.durationGT);
    console.log(name);
    console.log(durationLT);
    console.log(durationGT);
    const params = { name: name, durationGT: durationGT, durationLT: durationLT };
    res.status(200).json(req.unqfy.searchPlaylist(name, durationLT, durationGT));
});

rootApp.use((req, res, next) => {
    req.unqfy = unqfy.getUNQfy();
    next();
});

rootApp.use(bodyParse.urlencoded({ extended: true }));
rootApp.use(bodyParse.json());
rootApp.use('/api', artists, albums, tracks, playlists, users);

// rootApp.use((req,res) => {
//     res.status(404);
//     res.json({status: 404, errorCode: 'RESOURCE_NOT_FOUND'});
// });

rootApp.listen(port, () => console.log('Listening on ' + port));