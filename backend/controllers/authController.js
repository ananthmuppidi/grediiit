const User = require("../model/User")
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });
    const foundUser = await User.findOne({email : email}).exec()
    
    if(!foundUser){
        return res.sendStatus(404)
    }
    console.log(foundUser.password)

    if (!foundUser) {
        return res.sendStatus(401);
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const accessToken = jwt.sign(
            {
                "username" : foundUser.username,
                "email" : foundUser.email
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            "accesstoken": accessToken,
            "username": match.username,
            "email": match.email
        });
    } else {
        
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };