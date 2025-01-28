const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

//@desc Register a user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        res.status(400);
        throw new Error('Please provide name, email and password');
    }

    const userAvailable = await User.findOne({ email });

    if(userAvailable) {
        res.status(400);
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("The hashed password is: ", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@desc Login
//@route POST /api/users/login
//@access Public
const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    const user = await User.findOne({ email });
    if(!user) {
        res.status(400);
        throw new Error('Invalid email');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
        res.status(400);
        throw new Error('Invalid password');
    }

    if(user && isPasswordMatch) {
        const accessToken = jwt.sign(
            {
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '15m'
            }
        );
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            accessToken: accessToken
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    res.json({
        message: 'Login'
    });
});

//@desc Current User
//@route GET /api/users/current
//@access Private
const currentUser = asyncHandler(async (req, res) => {
    res.json({
        message: 'Current User info',
    });
    
});


module.exports = { registerUser, login, currentUser };