const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const userModel = require("./models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const cloudinary = require("./cloudinary/cloudinary")
const adminModel = require("./models/adminModel")

const app = express()
app.use(express.json())
app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true,
    })
)

app.use(cookieParser());

const uri = process.env.MONGO_URI
mongoose.connect(uri)



app.post('/signup', (req,res) => {
    const {name, email, password, image} = req.body
    console.log("name coming",name)
    console.log("email coming",email)
    console.log("pass coming",password)
    console.log("immage coming",image)

    bcrypt.hash(password, 10)
    .then((hashed) =>{
        userModel.create({name, email, password:hashed, image})
    })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
})



app.post('/login', (req,res) => {
    const {email, password} = req.body
    console.log("email coming",email)
    console.log("pass coming",password)

    userModel.findOne({email: email})
    .then(user => {
        
        console.log("userrrrr",user)
        bcrypt.compare(password, user.password , (err,response) =>{
            if(response){
                const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"})
                res.cookie("token", token, { httpOnly: true })
                res.json({message: "success", user })
               
            }else{
                res.json("incorrect passworddd")
            }
        })
       
    })
    .catch(err =>{
        res.status(500).json("server error",err)
    })
})

const verifyToken = (req,res,next) => {
    const token = req.cookies.token
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
            if(err){
                console.log('token verify err',err)
                return res.json("wrong token")
            }
            req.user = decoded
            next()
        })
    }
}

app.get("/home", verifyToken, (req, res) => {
    console.log("kkkkk")
    console.log("userdetails",req.user.email)
    userModel.findOne({ email: req.user.email })
        .then(user => {
            if (user) {
                 res.json({ message: "success", user: { name: user.name, email: user.email, image: user.image } });
            } else {
                 res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => {
            return res.status(500).json({ message: "Server error", error: err });
        });
});

app.post('/adminLogin', (req, res) => {
    const { adminname, password } = req.body
    console.log('Admin login coming:', adminname, password)

    adminModel.findOne({ adminname })
        .then(user => {
            console.log("adminnn",user)
            if(password === user.password){
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
                res.cookie("token",token)
                res.json({message:"success"})
            }else{
                res.join({message:"incorrect password"})
            }           
        })
        .catch(err => {
            console.error('Error finding user:', err)
            res.status(500).json({ message: 'Error finding user', error: err })
        });
});

app.get('/getUser', async (req, res) => {
    try {
      const searchQuery = req.query.search || '';
      const searchRegex = new RegExp(searchQuery, 'i'); 
  
      const users = await userModel.find({
        $or: [
          { name: { $regex: searchRegex } },
          { email: { $regex: searchRegex } }
        ]
      }).sort({ _id: -1 });
  
      if (users && users.length > 0) {
        return res.json(users);
      } else {
        res.json({ message: "No users found" })
      }
    } catch (err) {
      console.log(err)
    }
  });
  

app.get('/adminHome/editUser', async(req,res) => {
    try{
        const userId = req.query.id
        const user = await userModel.findOne({_id:userId})
        console.log("to edit",user)
        return res.json(user)
    }catch(err){
        console.log(err)
    }
})

app.post('/adminHome/editUser', async(req,res) => {
    const {id, name, email} = req.body

    try{
        const updatedUser = await userModel.findByIdAndUpdate(id, {name, email})
        console.log("updateduser", updatedUser)
        res.json(updatedUser)
    }catch(err){
        console.log(err)
    }
})

app.get('/deleteUser', async(req,res) => {
    try{
        const userId = req.query.id
        const user = await userModel.findOneAndDelete({_id:userId})
        if(!user){
            return res.join({message:"no user"})
        }
        const users = await userModel.find({})
        return res.json(users)
    }catch(err){
        console.log(err)
    }
})

app.post('/logout',(req,res)=>{
    res.clearCookie('token')
    res.json({message:"loggod out successfully"})
})


app.listen(3001,()=>{
    console.log("Server is running")
})