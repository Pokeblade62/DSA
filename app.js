//jshint esversion:6

const express=require("express");
const mongoose=require("mongoose");
const app=express();
const bodyParser=require("body-parser");
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

const dataSchema={
  name: String,
  email: String,
  room: Number,
  seat: Number
};

const List = mongoose.model("List",dataSchema);

var chosenSeat=[100,101];

const list1=new List({
name: "Yeshu",
email: "pokeblade62@gmail.com",
room: 100,
seat: 100
});

const list2=new List({
name: "Jack",
email: "jackblade62@gmail.com",
room: 101,
seat: 101
});

const defaultlist=[list1,list2];

app.get("/", function(req, res){

List.find({},function(err, found){

if(found.length===0){

  List.insertMany(defaultlist, function(err){
  if(err){
    console.log("yeet");
  }else{
    console.log("Successfully added defaults");
  }
  });

}
List.find({},function(err,foundd){
if(err){
console.log(err);
}

res.render(__dirname+"/views/index.ejs",{fSeat:chosenSeat,lool:foundd});
});

});
});



app.post("/",function(req,res){
var namek= req.body.field1;
var emailk= req.body.field2;
var roomk= req.body.field3;
var seatt= req.body.go;



console.log(namek,emailk,roomk,seatt);

const list=new List({
name: namek,
email: emailk,
room: roomk,
seat: seatt
});

list.save();

chosenSeat.push(seatt);


res.redirect("/");

});






app.listen(3000,function(){
  console.log("Listening On Port 3000");
});
