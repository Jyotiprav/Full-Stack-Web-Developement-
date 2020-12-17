const express=require("express");
const app=express();
app.set("view engine",'ejs');
// To add css in your file
app.use(express.static(__dirname + '/'));
//get the data from link
const https=require('https');
//body parser
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
var city="";
var description="";
var temp="";
var imageurl="nature.png";
app.get("/",function(req,res){
  
  res.render("index",{city:city,description:description,temp:temp,imageurl:imageurl});

});
app.post("/weather",function(req,res){
  city=req.body.city;
  var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=9d06fbac4284f0ad51ceda09fd804da2"
  city="Weather in : "+req.body.city;
  //get method to fetch the data from url
  https.get(url,function(response){
    console.log(response.statusCode);//200 -okay
    //extract JSON data
    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
      temp=weatherdata.main.temp+" Degree Celcius.";
      description=weatherdata.weather[0].description;
      var icon=weatherdata.weather[0].icon;
      imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      //res.write can have more than one lines
      // res.write("<h1>Temperature in " +city+" is "+temp+"</h1>");
      // res.write("<p>The weather is currently "+description+"</p>");
      // res.write("<img src="+imageurl+">");
      res.redirect("/");
    });
    });

    // res.render("index",{city:city,description:description,temp:temp});

});
app.listen(3000,function(){
  console.log("server is running");
})
