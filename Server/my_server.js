
var express = require ("express");
var server = express();
var bodyParser = require("body-parser");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

var users = [
    {
     id: 1,
     name: "John"
    },
    {
     id: 2,
      name: 'Kirill'
    }
];

server.get ('/', function (req, res){
    res.send('Welcome to my server')
})

server.get('/users', function(req, res){
    res.send(users);
})

server.get("/users/:id", function(req, res){
    console.log(req.params);
    var user = users.find(function (user){
        return user.id === Number(req.params.id)
    });
    res.send(user);
}) 

server.post("/users", function(req, res){
    var user = {
        id: req.body.id,
        name: req.body.name
    };
    users.push(user);
    console.log(req.body);
    res.send(req.body);
})

server.put("/users/:id", function (req, res){
    var user = users.find(function (user){
        return user.id === Number(req.params.id)
    });
    user.name = req.body.name;
    res.sendStatus(200);
})



server.listen(3012, function(){
    console.log('Started');
})





