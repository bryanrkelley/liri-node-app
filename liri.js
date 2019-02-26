//---TODO:Add logic for log.txt file to append information---

require('dotenv').config();

//---------Constructors--------------------------
var Spotify = require('node-spotify-api');

var axios = require('axios');

var fs = require('fs');

var moment = require('moment');
//---------End Constructors--------------------------

//------------KEYS-------------
var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
//------------End KEYS-------------

//------------Spotify Search-------------
function searchSpotify(search) {
    if (!search) {
        search = 'The Sign Ace of Base';
    }
    spotify.search({
        type: 'track',
        query: search,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log('\nArtist: ' + data.tracks.items[0].artists[0].name);
        console.log('\nSong title: ' + data.tracks.items[0].name);
        console.log('\nPreview link: ' + data.tracks.items[0].external_urls.spotify);
        console.log('\nAlbum: ' + data.tracks.items[0].album.name + '\n');
    });
};
//-------------------End Spotify Search---------------

//--------------------Movie Search--------------------
function searchOmdb(search) {
    if (!search) {
        search = 'Mr. Nobody';
    }
    var url = 'http://www.omdbapi.com/?t=' + search + '&y=&plot=short&apikey=' + keys.omdb.id;
    axios.get(url).then(
        function (response) {
            console.log('\nTitle: ' + response.data.Title);
            console.log('\nRelease Year: ' + response.data.Year);
            console.log('\nIMDB Rating: ' + response.data.Ratings[0].Value);
            console.log('\nRotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
            console.log('\nCountry Produced: ' + response.data.Country);
            console.log('\nLanguage: ' + response.data.Language);
            console.log('\nPlot: ' + response.data.Plot);
            console.log('\nActors: ' + response.data.Actors + '\n');
        }
    );
}
//--------------------End Movie Search--------------------

//--------------------Band Search-------------------------
function searchBands(search) {
    if (!search) {
        search = 'Maroon 5';
    }
    var url = 'https://rest.bandsintown.com/artists/' + search + '/events?app_id=' + keys.bands.id;
    axios.get(url).then(
        function (response) {
            var eventTime = response.data[0].datetime;
            console.log('\nVenue: ' + response.data[0].venue.name);
            console.log('\nVenue Location: ' + response.data[0].venue.city);
            console.log('\nDate of Event: ' + moment(eventTime).format('MM/DD/YYYY') + '\n');
        }
    );
}
//------------------End Band Search---------------------------

//------------------Text File---------------------------------
function searchText() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        //console.log(data);
        var dataArray = data.split(',');

        command = dataArray[0];
        media = dataArray[1];
        searchAll();
    });
};
//------------End Text File---------------------------------

//--------------Command Logic-------------------------------
var command = process.argv[2];
var media = process.argv.slice(3).join(' ');


var searchAll = function () {
    if (command === 'spotify-this-song') {
        searchSpotify(media);
    };

    if (command === 'concert-this') {
        searchBands(media);
    };

    if (command === 'movie-this') {
        searchOmdb(media);
    };

    if (command === 'do-what-it-says') {
        searchText(media);
    };
}

searchAll();
//--------------End Command Logic---------------------------