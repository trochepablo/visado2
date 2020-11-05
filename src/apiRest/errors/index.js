/* eslint-disable no-undef */
const errors = [];

errors.push('BadRequestError');
errors.push('DuplicateArtistError');
errors.push('NonExistentArtistError');
errors.push('DuplicateAlbumError');
errors.push('NonExistenPlaylistError');
errors.push('NonExistentTrackForAddPlaylistError');
errors.push('NonExistentArtistForAddAlbumError');
errors.push('NonExistentAlbumError');
errors.push('TheSongYouAreLookingForDoesNotExistError');

module.exports = errors;