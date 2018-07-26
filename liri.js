require("dotenv").config();

let keys = require("./keys.js");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var doWhat = process.argv[2];
whatToDo(doWhat);

function whatToDo(what, info){
    if(what === "my-tweet"){
    
    }else if(what === "spotify-this-song"){
    
    }else if(what === "movie-this"){
        inputOrNot(info);
    
    }else if(what === "do-what-it-says"){
        doFile();
    }
}

function inputOrNot(info){
    var movieName = "";
        var word = process.argv.length;
        if(process.argv[3]){
            for(var i = 3; i < word; i++){
                movieName += "+" + process.argv[i];
            }
        }else if(info){
            movieName = info;
        }else{
            movieName = "Mr.Nobody"
        }
        movieInfo(movieName);
}

function movieInfo(movieName){
    queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";;
    request(queryUrl, function(err, res, body) {
        if(err) throw err;
        var movie = JSON.parse(body);

        console.log("Title: " + movie.Title);
        console.log("Year: " + movie.Year);
        console.log("IMDB Rating: " + movie.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
        console.log("Country Origin: " + movie.Country);
        console.log("Language: " + movie.Language);
        console.log("Plot: " + movie.Plot);
        console.log("Actors: " + movie.Actors);
    });
}

function doFile(){
    fs.readFile("random.txt", "utf8", (err, data) => {
        if(err) throw err;
        var task = data.split(",")
        whatToDo(task[0], task[1]);
    })
}