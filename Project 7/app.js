const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname +"/"));

// Connect Mongodb with mongoose
const mongoose=require('mongoose');
const url="mongodb://127.0.0.1:27017/BlogDB";
mongoose.connect(url,{useNewUrlParser:true});
// check if we are Connected
const db=mongoose.connection;
db.once('open',function(){
  console.log("Database Connected");
});

// create post collection
const postSchema={
  name:String,
  post:String,
  date:String
};
const Post=mongoose.model("Posts",postSchema);
// Create items
const post1=new Post({
  name:"Name of the User",
  post:"This is my first post",
  date:"Today"
});
const defaultPosts=[post1];
// insert posts inside database
// Post.insertMany(defaultPosts,function(err){
//   if(err){
//     console.log("error");
//   }
//   else{
//     console.log("Data inserted!!");
//   }
// });
// create login collection
const loginSchema={
  email:String,
  password:String,
  post:[postSchema]
};
const Login=mongoose.model("Login",loginSchema);
// Create items
const login1=new Login({
  email:"test@gmail.com",
  password:"12345",
  post:defaultPosts
});
const defaultLogin=[login1];
// insert posts inside database
// Login.insertMany(defaultLogin,function(err){
//   if(err){
//     console.log("error");
//   }
//   else{
//     console.log("Data inserted in login!!");
//   }
// });




// VARIABLES FOR ALL PAGES
var h="This is Home page.";
var a="This is about page";
var p="This is post page.";
var c="Contact us here.";
// Array for post data
var names=[];
var posts=[];
var dates=[];
//  home page
app.get("/",function(req,res){
      res.render("home",{home_var:h});
});
// ABOUT page
app.get("/about",function(req,res){
 res.render("about",{about_var:a});
});
app.get("/login",function(req,res){
  res.render("login",{success:""});
 });
 app.get("/signin",function(req,res){
  res.render("signin",{info:""});
 });
// CONTACT PAGE
app.get("/contact",function(req,res){
 res.render("contact",{contact_var:c});
});
// POST PAGE
app.get("/post",function(req,res){

Post.find({},function(err,foundItem){
  console.log(foundItem[0].post);
  res.render("post",{post_var:p, posts_info:foundItem});
});
});
// var router = express.Router();
// router.post('/add', function(req, res, next) {
//    res.status(201).render('new', { isAdded : true } );
// });
app.post("/post",function(req,res){

  var name=req.body.name;
  var formemail=req.body.email;
  var formpost=req.body.msg;
  // console.log(formpost);
  var postExixts="";
  // check if post already exixts
  Login.findOne({email: formemail}, function(err, foundItem){
    if(!err){
      if(!foundItem){
        console.log("user does not exixts");
      }
      else{
        // check for posts
        for(var i=0;i<foundItem.post.length;i++){
          if(foundItem.post[i].post === formpost){
            console.log("post exixts");
            postExixts="True";
            break;
          }
        }
        if(postExixts != "True"){
          console.log("Creating new post");
          var options={
              day:"numeric",
              month:"long",
              year:"numeric"
            }
          var date=new Date().toLocaleDateString("en-US",options);
          const newpost=new Post({
            name:name,
            post:formpost,
            date:date
          });
          foundItem.post.push(newpost);
          foundItem.save();
          Post.insertMany([newpost],function(err){
              if(err){
                console.log("error");
              }
              else{
                console.log("Data inserted!!");
              }
            });
          res.render("user",{post_info:foundItem,msg:""});
          // res.redirect("/");
        }
        
      }
    }
    if(err){console.log(err);}
  });
});
  
    
    
    


// login page

app.post("/login",function(req,res){
  const formemail=req.body.email;
  const formpassword=req.body.password;
  Login.findOne({email: formemail, password:formpassword},function(err,foundItem){
    if(!err){
      if(!foundItem){
        // create new user
        
        res.render("signin",{info:"New user Sign up here."});
        
      }
      else{
        console.log(foundItem);
        res.render("user",{post_info:foundItem,msg:""});
      }
    }
  });
});
// Signin page

app.post("/signin",function(req,res){
  const formemail=req.body.email;
  const formpassword=req.body.password;
  Login.findOne({email: formemail, password:formpassword},function(err,foundItem){
    if(!err){
      if(!foundItem){
        // create new user
        const newuser=new Login({
          email:formemail,
          password:formpassword,
          post:[]
        });
        newuser.save();
        res.render("login",{success:"Your account has been created. Please Log in to your account."});
        
      }
      else{
        console.log(foundItem.post);
        res.render("user",{post_info:foundItem,msg:""});
      }
    }
  });
});


// Delete Post
app.post("/delete",function(req,res){
 console.log("delete button pressed.")
 console.log(req.body.item_id)
 const item_id=req.body.item_id;
 
 Login.updateMany({ },{$pull:{post:{_id:item_id}}},function(err,result){
   if(!err){
    console.log("Info Deleted"+req.body.user_id)
    Login.findOne({_id: req.body.user_id},function(err,foundItem){
      if(!err){
        if(!foundItem){
          // do nothing here
        }
        else{
          console.log(foundItem.post);
          res.render("user",{post_info:foundItem,msg:"Successfully Deleted."});
        }
      }
    });

    // res.render("user",{post_info:[]});
   }
 });
 Post.findByIdAndRemove(item_id,function(err){
  if(err){console.log("Error");}
      // else{console.log("Information Deleted");
      
      //   }
        
 });


});



// app.listen(3000,function(){
//   console.log("Server is running");
// });
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
  console.log("Server is running");
})
