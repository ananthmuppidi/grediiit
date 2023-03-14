const User = require("../model/User");
const Follower = require("../model/Follower");
const Subgrediiit = require("../model/Subgrediiit");
const Post = require("../model/Post");
const Reader = require("../model/Reader");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

const getAllSubgrediiits = async (req, res) => {

    
    let currentEmail = "";
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.sendStatus(401);
        return;
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        currentEmail = decoded.email;
    });

    try {
        const subgrediiits = await Subgrediiit.find();
        const subgrediiitsToSend = await Promise.all(
            subgrediiits.map(async (subgrediiit) => {
                
                const tagsString = subgrediiit.tags.join(", ");
                const bannedString = subgrediiit.banned.join(", ");
        
                const numPosts = await Post.countDocuments({
                    postedin: subgrediiit.name,
                });
        
                const numReaders = await Reader.countDocuments({
                    grediiit: subgrediiit.name
                })
        
                let status = ''
        
                const item = await Reader.findOne({ grediiit: subgrediiit.name, follower: currentEmail })
        
                if (!item) {
                    status = "follow"
                } else {
        
                    if (item.status === "following") {
                        status = "leave"
                    }
        
                    if (item.status === "requested") {
                        status = "requested"
                    }
        
        
                    if (item.status === "left") {
                        status = "left"
                    }
        
                    if (subgrediiit.admin === currentEmail) {
                        status = 'disabled'
                    }
                }
                
        
               
        
                return {
                    ...subgrediiit.toObject(),
                    tags: tagsString,
                    banned: bannedString,
                    numPosts: numPosts,
                    numReaders: numReaders,
                    status: status
        
                };
            })
        );
        

        res.json(subgrediiitsToSend);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getAllSubgrediiits };
