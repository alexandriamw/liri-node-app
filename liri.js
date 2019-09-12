require("dotenv").config();
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var command = process.argv[2];
var input = process.argv[3];

switch (command) {
    case "spotify-this-song":
        var spotify = new Spotify(keys.spotify);

        spotify.search({
            type: 'track',
            query: input
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            const trackInfo = data.tracks.items[0];
            const artist = trackInfo.artists[0].name;
            const album = trackInfo.album.name;
            const songName = trackInfo.name;
            const previewLink = trackInfo.external_urls.spotify;


            console.log("Song name: " + songName);
            console.log("Artist: " + artist);
            console.log("Album: " + album);
            console.log("Listen on Spotify: " + previewLink);
        });
        break;

    case "concert-this":
        break;

    case "movie-this":
        break;

    case "do-what-it-says":
        break;
}



//"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"