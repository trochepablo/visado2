/* eslint-disable no-undef */
const GetTrackByIdCommand = require('./track/GetTrackByIdCommand');
const AddTrackCommand = require('./track/AddTrackCommand');
const GetTracksMatchingGenresCommand = require('./track/GetTracksMatchingGenresCommand');
const ListTracksCommand = require('./track/ListTracksCommand');
const RemoveTrackCommand = require('./track/RemoveTrackCommand');
const PrintTracksCommand = require('./track/PrintTracksCommand');
const PrintTracksForArtistCommand = require('./track/PrintTracksForArtistCommand');
const PrintTracksForGenreCommand = require('./track/PrintTracksForGenreCommand');
const GetLyricsCommand = require('./track/GetLyrics');

const CreatePlaylistCommand = require('./playlist/CreatePlaylistCommand');
const GetPlaylistByIdCommand = require('./playlist/GetPlaylistByIdCommand');
const ListPlaylistsCommand = require('./playlist/ListPlaylistsCommand');

const AddArtistCommand = require('./artist/AddArtistCommand');
const GetArtistByIdCommand = require('./artist/GetArtistByIdCommand');
const GetTracksMatchingArtistCommand = require('./artist/GetTracksMatchingArtistCommand');
const ListArtistsCommand = require('./artist/ListArtistsCommand');
const RemoveArtistCommand = require('./artist/RemoveArtistCommand');
const PrintArtistsCommand = require('./artist/PrintArtistsCommand');

const AddAlbumCommand = require('./album/AddAlbumCommand');
const GetAlbumByIdCommand = require('./album/GetAlbumByIdCommand');
const ListAlbumsCommand = require('./album/ListAlbumsCommand');
const RemoveAlbumCommand = require('./album/RemoveAlbumCommand');
const PrintAlbumsCommand = require('./album/PrintAlbumsCommand');
const PopulateAlbumsForArtist = require('./album/PopulateAlbumsForArtistCommand');

const AddUserCommand = require('./user/AddUserCommad');
const UserListensToATrackCommand = require('./user/UserListensToATrackCommand');
const TracksheardUserCommand = require('./user/TracksheardUserCommand');
const NumberOfTracksHeardUserCommand = require('./user/NumberOfTracksHeardUserCommand');
const TresMostListenedTracksOfTheMomentUserCommand = require('./user/TresMostListenedTracksOfTheMomentUserCommand');

const commands = new Map();
// track commands
commands.set('GETTRACKBYID', GetTrackByIdCommand);
commands.set('ADDTRACK', AddTrackCommand);
commands.set('GETTRACKSMATCHINGGENRES', GetTracksMatchingGenresCommand);
commands.set('LISTTRACKS', ListTracksCommand);
commands.set('REMOVETRACK', RemoveTrackCommand);
commands.set('PRINTTRACKSFOR', PrintTracksCommand);
commands.set('PRINTTRACKSFORARTIST', PrintTracksForArtistCommand);
commands.set('PRINTTRACKSFORGENRE', PrintTracksForGenreCommand);
commands.set('GETLYRICS', GetLyricsCommand);


// playlist commands
commands.set('CREATEPLAYLIST', CreatePlaylistCommand);
commands.set('GETPLAYLISTBYID', GetPlaylistByIdCommand);
commands.set('LISTPLAYLISTS', ListPlaylistsCommand);
// artist commands
commands.set('ADDARTIST', AddArtistCommand);
commands.set('GETARTISTBYID', GetArtistByIdCommand);
commands.set('GETTRACKSMATCHINGARTIST', GetTracksMatchingArtistCommand);
commands.set('LISTARTISTS', ListArtistsCommand);
commands.set('REMOVEARTIST', RemoveArtistCommand);
commands.set('PRINTARTISTSFOR', PrintArtistsCommand);
// album commands
commands.set('ADDALBUM', AddAlbumCommand);
commands.set('GETALBUMBYID', GetAlbumByIdCommand);
commands.set('LISTALBUMS', ListAlbumsCommand);
commands.set('REMOVEALBUM', RemoveAlbumCommand);
commands.set('PRINTALBUMSFOR', PrintAlbumsCommand);
// user commands
commands.set('ADDUSER', AddUserCommand);
commands.set('USERLISTENSTOATRACK', UserListensToATrackCommand);
commands.set('TRACKSLISTENEDTOBYUSER', TracksheardUserCommand);
commands.set('USERHOWMANYTRACKSHAVEYOUHEARD', NumberOfTracksHeardUserCommand);
commands.set('TRESMOSTLISTENEDTRACKSOFTHEMOMENT', TresMostListenedTracksOfTheMomentUserCommand);
commands.set('POPULATEALBUMSFORARTIST', PopulateAlbumsForArtist);


module.exports = commands;
