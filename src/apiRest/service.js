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

rootApp.use((req,res,next) => {
   req.unqfy =  unqfy.getUNQfy();
   next();
});

rootApp.use(bodyParse.urlencoded({ extended: true }));
rootApp.use(bodyParse.json());
rootApp.use('/api', artists,albums,tracks,playlists,users);

rootApp.use((req,res) => {
    res.status(404);
    res.json({status: 404, errorCode: 'RESOURCE_NOT_FOUND'});
});

rootApp.listen(port, () => console.log('Listening on ' + port));