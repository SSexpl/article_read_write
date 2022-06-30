//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//const validate=require('./validate.js');// for validation of forms
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
var enteries=require('./model/blog.js');
const app = express();

app.set('view engine', 'ejs');
const reg = require('./routes/auth.js');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/',reg );
app.get('/',(req,res)=>
{
  enteries.find(function(err,result)
    {
        if(err)
        console.log(err);
        else
        res.render("home.ejs",{homehead:homeStartingContent,items:result});
    });
});
app.get('/about',(req,res)=>
{
  res.render('about.ejs',{aboutcontent:aboutContent});
});
app.get('/contact',(req,res)=>
{
  res.render('contact.ejs',{contact:contactContent});
});
app.get('/compose',(req,res)=>
{
  res.render('compose.ejs');
});
app.post('/compose',(req, res) => {
var titlename=req.body.title;
 var dataread= req.body.data;
 let addedblog= new enteries({
  title:titlename,
  data:dataread
 });
 addedblog.save()
 .then(doc => {
   console.log(doc)
 })
 .catch(err => {
   console.error(err)
 })
  res.redirect('/');
 
});

app.get('/:topic', (req, res) => {
  var title= req.params.topic;
  enteries.findOne({title:title},function(err,ans)
  {
    if(err)
    console.log(err);
    else
    res.render('post.ejs',{heading:ans.title,content:ans.data});
  })
  
    
  

});
















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
