// server.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user'); // Import User model
const path = require("path")
const app = express();
const port = 3000;

app.use(express.json()); // For parsing JSON data
app.use("/css",express.static(__dirname+"/css"))
app.use("/img",express.static(__dirname+"/img"))
console.log(__dirname);

// MongoDB connection
const mongoURI = 'mongodb+srv://MiVii:MiVii%40123@userauth.q7w4z.mongodb.net/userDB?retryWrites=true&w=majority&appName=userauth'; // Use your MongoDB URI
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Registration route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
   
    try {
        const user = new User({ name, email, password });
        await user.save();
        console.log("user created")
        res.status(201).json({msg:'User registered successfully'})

    } catch (err) {
        res.status(500).send({ message: 'Error registering user', error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email:email})
        if(!user){
            res.status(400).json({error:"no user found"})
            return
        }
        if(user.password !== password){
            res.status(400).json({error:"Invalid password"})
            return
        }

        res.status(200).json({msg:'User login success'})

    } catch (err) {
        res.status(500).send({ message: 'Error registering user', error: err.message });
    }
});

app.get("/",(req,res) => {
    res.sendFile(path.join(path.resolve(),"views","login.html"))
})

app.get("/register", (req,res) => {
    res.sendFile(path.join(path.resolve(),"views","signup.html"))
})

app.get("/frame", (req,res) => {
    res.sendFile(path.join(path.resolve(),"views","frame.html"))
})

app.get("/redirect", (req,res) => {
    res.sendFile(path.join(path.resolve(),"views","login.html"))
})


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
