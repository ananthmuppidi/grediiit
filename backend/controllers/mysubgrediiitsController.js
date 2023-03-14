const User = require("../model/User");
const Subgrediiit = require("../model/Subgrediiit");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Post = require('../model/Post');
const Reader = require('../model/Reader')

const createSubgrediiit = async (req, res) => {
    let currentEmail = '';
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.sendStatus(401); // Unauthorized
        return;
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Forbidden
            currentEmail = decoded.email;
        }
    );

    const { name, description, tags, banned } = req.body;
    if (!name || !description) {
        res.status(400).json({ error: 'Missing required field(s)' });
        return;
    }

    const user = await User.findOne({ email: currentEmail });
    if (!user) {
        res.sendStatus(404); // Not Found
    }

    const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    const bannedArray = banned ? banned.split(',').map(banned => banned.trim()) : [];

    const duplicate = Subgrediiit.findOne({name : name})

    if(duplicate.name){

        return res.sendStatus(409)
    }
    const subgrediiit = new Subgrediiit({
        name,
        description,
        tags: tagArray,
        banned: bannedArray,
        admin: currentEmail
    });

    try {
        const savedSubgrediiit = await subgrediiit.save();
        res.status(201).json(savedSubgrediiit);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
};

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
      const subgrediiits = await Subgrediiit.find({ admin: currentEmail });
      const subgrediiitsToSend = await Promise.all(
        subgrediiits.map(async (subgrediiit) => {
          const tagsString = subgrediiit.tags.join(", ");
          const bannedString = subgrediiit.banned.join(", ");
  
          const numPosts = await Post.countDocuments({
            postedin: subgrediiit.name,
          });

          const numReaders = await Reader.countDocuments({
            grediiit : subgrediiit.name
          })
  
          return {
            ...subgrediiit.toObject(),
            tags: tagsString,
            banned: bannedString,
            numPosts: numPosts,
            numReaders: numReaders
          };
        })
      );
  
      res.json(subgrediiitsToSend);
    } catch (err) {
        console.log(err)
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  

const deleteSubgrediiit = async (req, res) => {
    let currentEmail = '';
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.sendStatus(401);
        return;
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            currentEmail = decoded.email;
        }
    );

    const name_subgrediiit  = req.body.name_subgrediiit;

    
    try {
        const subgrediiit = await Subgrediiit.findOne({ name: name_subgrediiit, admin: currentEmail });
        if (!subgrediiit) {
            res.sendStatus(404);
            return;
        }
        await Subgrediiit.deleteOne({name : subgrediiit.name});
        res.sendStatus(204);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = { createSubgrediiit, getAllSubgrediiits, deleteSubgrediiit }

