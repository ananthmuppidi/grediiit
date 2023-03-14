const User = require("../model/User");
const Follower = require("../model/Follower");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

const getFollowers = async (req, res) => {
    
    let currentEmail = '';
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

    const user = await User.findOne({ email: currentEmail });
    if (!user) {
        return res.sendStatus(404);

    }

    const followers = await Follower.find({ followed: user.email });
    res.json(followers);
}
const getFollowing = async (req, res) => {
    
    let currentEmail = '';
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

    const user = await User.findOne({ email: currentEmail });
    if (!user) {
        return res.sendStatus(404);

    }

    const followings = await Follower.find({ follower: user.email });
    res.json(followings);
}



const follow = async (req, res) => {
    let currentEmail = '';
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

    console.log(currentEmail);

    const user = await User.findOne({ email: currentEmail });
    if (!user) {
        res.sendStatus(404);
        return;
    }

    const followedUser = await User.findOne({ email: req.body.email });
    if (!followedUser) {
        res.sendStatus(404);
        return;
    }

    const following = new Follower({
        follower: user.email,
        followed: followedUser.email
    });

    await following.save();
    res.sendStatus(200);
}


const removeFollower = async (req, res) => {
    
    let currentEmail = '';
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

    console.log(currentEmail);
    try {
        
        await Follower.deleteOne({ following: req.body.email, follower: currentEmail })
        return res.sendStatus(200);
    } catch (err) {
        console.log(err)
        return res.sendStatus(404)
    }



}

const removeFollowing = async (req, res) => {
    let currentEmail = '';
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

    console.log(currentEmail);

    const user = await User.findOne({ email: currentEmail });
    if (!user) {
        res.sendStatus(404);
        return;
    }
    try {
        await Follower.deleteOne({ follower: req.body.email, following: currentEmail })
        return res.sendStatus(200);
    } catch (err) {
        console.log(err)
        return res.sendStatus(404)
    }

}

module.exports = { getFollowers, getFollowing, follow, removeFollower, removeFollowing };
