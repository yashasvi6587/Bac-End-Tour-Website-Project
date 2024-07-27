const express=require("express")
const app=express()
const fs=require("fs")
const bodyparser=require("body-parser")
const path=require("path")

var mongoose=require("mongoose")
mongoose.connect("mongodb://localhost/Blog")

const port=80;

var ContactSchema=new mongoose.Schema({
    name:String,
    email:String,
    number:Number,
    gender:String,
})

var Contact=mongoose.model("Contact",ContactSchema)

app.use("/static",express.static("static"))
app.use(express.urlencoded())

app.set("view engine","pug")
app.set("views",path.join(__dirname,"views"))

app.get("/Home",(req,res)=>{
    res.status(200).render("Home.pug")
})

app.get("/Services",(req,res)=>{
    res.status(200).render("Services.pug")
})


app.post("/Services",(req,res)=>{
    var myData=new Contact(req.body)
    myData.save().then(()=>{
        res.send("Congratulations! Your form has been submitted successfully")
    }).catch(()=>{
        res.status(404).send("Page not found")
    })
    // res.status(200).render("About.pug")
})
app.listen(port,()=>{
    console.log(`Listening on the port ${port}`)
})
