const url = "mongodb://localhost:27017/myDB";
const MongoClient = require("mongodb").MongoClient;
const express = require('express');
const util = require('util')
const fs = require('fs')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//vk api
const api_url = 'https://api.vk.com/method/newsfeed.search?v=5.52&q=NEW%20Year&latitude=56.8575&longtitude=60.1625&count=150&access_token=cd1d049be2403b817c4ed5621be85f226a16c6ff4340e7498b303ea59e2c3e5a3d6700d061d1a6e554984'
//openweather map api for test purposes
//const api_url = "https://api.openweathermap.org/data/2.5/weather?q=Yekaterinburg,{country%20code}&appid=53f63e6a4d34ba654b1b82cc8e490712"
const mongoClient = new MongoClient(url, { useNewUrlParser: true });

const app = express();
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

app.listen(8080, function(){
    mongoClient.connect( function(err, client){
     if (err){
        console.log(err);
     }
        var db = client.db("mydb");
 
        //create collection wall_posts in 'mydb'
        const collection = db.collection("wall_posts");
        
        //insert our wall_posts_data into wall_posts collection
        db.collection("wall_posts").insertMany(
            
            //parse data into array of documents
            JSON.parse(prepare(get(api_url))),
            
            function(err, results){
                   
                if (err) throw err; 
                   console.log();
          });
   }); 
});


//receive data from web
function get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    //console.log( Httpreq.responseText);
    return Httpreq.responseText;           
}



//overwrite built_in console.log function to write debug data to a file
console.log = function () {
    log_file.write(util.format.apply(null, arguments) + '\n');
    log_stdout.write(util.format.apply(null, arguments) + '\n');
  }
  console.error = console.log;

//convert raw API output to "array of documents"-like string
function prepare (my_string){
    var temp =my_string.replace('{"response":{"items":',"");
    var data = temp.substring(0, temp.indexOf(',"count":1000,'));
    console.log(data);
    return (data)
}