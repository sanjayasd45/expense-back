const generateToken = require("../helpers/generateTokens");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");


const loginController = async(req, res) => {
    let username = req.body.username.trim()
    let password = req.body.password.trim()
    if(!username || !password){
        return res.status(409).json({
            message : "incomplete Info"
        })
    } 
    const user = await User.findOne({username});
    // console.log("user from login" , user);
    if(user && (await user.matchPassword(password, user.password))){ 
        const response = {
            _id : user._id,
            name : user.name,
            username : user.username,
            email : user.email,
            token : generateToken(user._id),
            createdAt : user.createdAt
        }
        res.json(response)
    }else{
        return res.status(400).json({
            message : "username or password is incorrect"
        })
    }
}

const signupController = async (req, res, next) => {
    const { name, username, email, password } = req.body;

    // Input validation
    if (!name || !username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if email or username already exists
        const userExist = await User.findOne({ email });
        const usernameExist = await User.findOne({ username });

        if (userExist && usernameExist) {
            return res.status(409).json({
                 message: "Email and username are already in use.",
                 formData : {
                    name,
                    email,
                    username
                 }
             });
        }

        if (userExist) {
            return res.status(409).json({ 
                message: "Email is already in use." ,
                formData : {
                    name,
                    email,
                    username
                 }
            });
        }

        if (usernameExist) {
            return res.status(409).json({ 
                message: "Username is already in use." ,
                formData : {
                    name,
                    email,
                    username
                 }
            });
        }
        
        const user = await User.create({
            name,
            username,
            email,
            password
        });

        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                token: generateToken(user._id), // Assuming generateToken is defined elsewhere
            });
        } else {
            return res.status(500).json({ message: "Signup failed." });
        }
    } catch (error) {
        next(error); // Pass error to the error-handling middleware
    }
}
module.exports = {
    loginController,
    signupController
}