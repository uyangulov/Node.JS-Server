const url = "mongodb://localhost:27017/";
const MongoClient = require("mongodb").MongoClient;
//vk api
const api_url = 'https://api.vk.com/method/newsfeed.search?v=5.52&q=NEW%20Year&latitude=56.8575&longtitude=60.1625&count=150&access_token=cd1d049be2403b817c4ed5621be85f226a16c6ff4340e7498b303ea59e2c3e5a3d6700d061d1a6e554984'

//openweather map api for test purposes
//const api_url = "https://api.openweathermap.org/data/2.5/weather?q=Yekaterinburg,{country%20code}&appid=53f63e6a4d34ba654b1b82cc8e490712"

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const mongoClient = new MongoClient(url, { useNewUrlParser: true });


mongoClient.connect(function(err, client){
    if (err){
        console.log(err);
    }

   //call function get to from variable from web data
   let wall_posts_data = Get(api_url);

   console.log("wall_posts arrived")
    
    // create a database
    const db = client.db("my_database");

    //create collection wall_posts in my_database
    const collection = db.collection("wall_posts");
         
        //insert our wall_posts_data into wall_posts collection
        collection.insertMany(wall_posts_data, function(err, results){
              
          console.log();
        });
});


//receive data from web
function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;           
}