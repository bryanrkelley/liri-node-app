require('dotenv').config();

//Constructors
var Spotify = require('node-spotify-api');

// var Omdb = require('omdb');

var BandsInTown = require('bandsintown');

//-------------------------
var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);

// var omdb = new Omdb(keys.omdb);

var bandsintown = new BandsInTown(keys.bands);

//-------------------------


spotify.search({
    type: 'track',
    query: 'The Sign'
}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    console.log(data);
});

//---------------------------

// omdb.search('saw', function (err, movies) {
//     if (err) {
//         return console.error(err);
//     }

//     if (movies.length < 1) {
//         return console.log('No movies were found!');
//     }

//     movies.forEach(function (data) {
//         console.log('%s (%d)', data.title, data.year);
//     });

//     // Saw (2004)
//     // Saw II (2005)
// });

// omdb.get({
//     title: 'Saw',
//     year: 2004
// }, true, function (err, data) {
//     if (err) {
//         return console.error(err);
//     }

//     if (!data) {
//         return console.log('data not found!');
//     }

//     console.log('%s (%d) %d/10', data.title, data.year, data.imdb.rating);
//     console.log(data.plot);

//     // Saw (2004) 7.6/10
//     // Two men wake up at opposite sides of a dirty, disused bathroom, chained
//     // by their ankles to pipes. Between them lies...
// });

//---------------------------



bandsintown
    .getArtistEventList('Skrillex')
    .then(function (events) {
        // return array of events
    });


//-----------

// var command = process.argv[2];

// var media = process.argv[3];

// if (command === 'spotify-this-song') {

// };