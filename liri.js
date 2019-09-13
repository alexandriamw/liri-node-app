require("dotenv").config();
const Spotify = require("node-spotify-api");
const moment = require("moment");
const axios = require("axios");
const fs = require("fs");
const keys = require("./keys.js");

function execCommand(command, input) {
    switch (command) {
        case "spotify-this-song":
            const spotify = new Spotify(keys.spotify);

            if (input === undefined) {
                input = "Ace of Base The Sign";
            }

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
            if (input === undefined) {
                input = "Metallica";
            }

            axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
                .then(function (response) {
                    const eventInfo = response.data[0];
                    const venue = eventInfo.venue.name;
                    const location = eventInfo.venue.city + ", " + eventInfo.venue.country;
                    const date = moment(eventInfo.datetime).format('MM/DD/YYYY');

                    console.log("Venue: " + venue);
                    console.log("Location: " + location);
                    console.log("Date: " + date);
                })
                .catch(function (error) {
                    console.log(error);
                })
            break;

        case "movie-this":
            if (input === undefined) {
                input = "District 9";
            }

            axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + input)
                .then(function (response) {
                    const movieData = response.data;
                    const title = movieData.Title;
                    const year = movieData.Year;
                    const rating = movieData.Rated;
                    const rottenRating = movieData.Ratings[1].Value;
                    const country = movieData.Country;
                    const language = movieData.Language;
                    const plot = movieData.Plot;
                    const actors = movieData.Actors;

                    console.log("Title: " + title);
                    console.log("Year: " + year);
                    console.log("Rated: " + rating);
                    console.log("Rotten Tomatoes Rating: " + rottenRating);
                    console.log("Country: " + country);
                    console.log("Language: " + language);
                    console.log("Plot: " + plot);
                    console.log("Actors: " + actors);
                })
                .catch(function (error) {
                    console.log(error);
                })
            break;

        case "do-what-it-says":
            fs.readFile('./random.txt', function (err, data) {
                if (err) throw err;
                const textContent = data.toString();
                const [command, input] = textContent.split(",");
                execCommand(command, input);
            });
            break;
    }
}

const command = process.argv[2];
let input = process.argv[3];

execCommand(command, input);