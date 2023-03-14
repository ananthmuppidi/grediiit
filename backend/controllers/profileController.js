const User = require("../model/User")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

const getCurrentProfile = async (req, res) => {
    let currentEmail = ''
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            currentEmail = decoded.email;
        }
    );

    console.log(currentEmail)

    const foundProfile = await User.findOne({email : currentEmail})

    if(!foundProfile){
        res.sendStatus(404)
    }

    res.json({
        "firstname" : foundProfile.firstname,
        "lastname" : foundProfile.lastname,
        "username": foundProfile.username,
        "email": foundProfile.email,
        "password" : "Type new password here",
        "age" : foundProfile.age,
        "contact" : foundProfile.contact
    })
}

const setCurrentProfile = async (req, res) => {
    let currentEmail = ''
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            currentEmail = decoded.email;
        }
    );

    console.log(currentEmail)
    console.log(req.body)

    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const foundProfile = await User.findOneAndUpdate({email : currentEmail}, {

        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "username": req.body.username,
        "email": req.body.email,
        "age": req.body.age,
        "contact": req.body.contact,
        "password": hashedPwd,
    })

    if(!foundProfile){
        res.sendStatus(404)
    } else {
        const final = await User.findOne({email : currentEmail})
        res.json(final)
    }
}




module.exports = { getCurrentProfile, setCurrentProfile };