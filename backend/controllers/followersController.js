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


    const user = await User.findOne({ email: currentEmail });
    if (!user) {

        res.sendStatus(404);
        return;
    }

    console.log(req.body.email)

    const followedUser = await User.findOne({ username: req.body.email });
    if (!followedUser) {

        res.sendStatus(404);
        return;
    }

    console.log(user.email)
    console.log(followedUser.email)

    const following = new Follower({
        follower: user.email,
        followed: followedUser.email
    });

    const alreadyFollows = await Follower.findOne({ follower: user.email, followed: followedUser.email })
    if (!alreadyFollows && (user.email != followedUser.email)) { await following.save(); }

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


    
    try {
        
        await Follower.deleteOne({ follower: req.body.email, followed: currentEmail })
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

    const user = await User.findOne({ email: currentEmail });
    if (!user) {
        res.sendStatus(404);
        return;
    }

    try {
        console.log(req.body.email)
        await Follower.deleteOne({ follower: currentEmail, followed: req.body.email})
        return res.sendStatus(200);
    } catch (err) {
        console.log(err)
        return res.sendStatus(404)
    }

}

module.exports = { getFollowers, getFollowing, follow, removeFollower, removeFollowing };
