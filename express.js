var express = require('express');
var bodyParser = require("body-parser")
var app = express();
const path = require("path")
const cors = require('cors');

app.use(express.static(path.join(__dirname)));
app.use(cors({
    origin: '*'
}));

app.get("/", function (req, res)  {
    app.use(express.static(path.join(__dirname, "/index.html")));
});

app.get("/guestbook", function (req, res)  {
    res.sendFile(__dirname+ "/guestbook.html");
});

app.get("/newmessage", function (req, res)  {
    res.sendFile(__dirname+ "/newmessage.html");
});

app.get( '/lists' , function(req, res){
    console.log("request got");
    const fs = require('fs');
    fs.readFile("data.json", function(err, data){
        console.log(err)
        data = JSON.parse(data);
        res.json(data);
        console.log("datasent success")
    });
});

app.get("*", function (req, res)  {
    res.send("<h1>Requested page doesnt exist</h1>");
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post( "/datat" , function(req, res){
    const fs = require('fs');
    let productObj= {
        Name: req.body.name,
        Country: req.body.country,
        Message: req.body.message,
        Date: Date()
      };    
      console.log(JSON.stringify(req.body.name));
      console.log(JSON.stringify(req.body.country));
      console.log(JSON.stringify(req.body.message));
      console.log(Date());
      fs.readFile('data.json', function (err, data) {
        let result = JSON.parse(data);
        result.push(productObj);
     
        let jsone= JSON.stringify(result);
        fs.writeFile("data.json", jsone, function(err){
          if (err) throw err;
          console.log('append success');
        });
      });
});
app.listen(8081, function(){
    console.log("started");
});

