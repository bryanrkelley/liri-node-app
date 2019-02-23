require('dotenv').config();

var Spotify = require('node-spotify-api');

//console.log(process.env);

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);

//-------------------------


spotify.search({
    type: 'track',
    query: 'All the Small Things'
}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
});



//-----------

// var command = process.argv[2];

// var media = process.argv[3];

// if (command === 'spotify-this-song') {

// };