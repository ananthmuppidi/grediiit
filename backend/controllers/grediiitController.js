const jwt = require('jsonwebtoken');
const User = require('../model/User')
const Subgrediiit = require("../model/Subgrediiit")
const Save = require("../model/Save")
const Post = require('../model/Post');
const Reader = require("../model/Reader")

// Create post function
async function createPost(req, res) {
  try {
    // Get the subgrediiit from the URL parameter
    const subgrediiit = req.params.subgrediiit;

    // Get the user making the post from the JWT

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
    const presentSubgrediiit = await Subgrediiit.findOne({ name: subgrediiit })
    if (!presentSubgrediiit) {
      return res.sendStatus(404)
    }

    const newPost = new Post({
      text: req.body.text,
      postedby: user.username,
      postedbyemail: user.email,
      postedin: subgrediiit,
      upvote: [],
      downvote: [],
    });

    // Save the new post to the database
    await newPost.save();

    // Send a response indicating the post was created successfully
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllPosts(req, res){
  const subgrediiit = req.params.subgrediiit;
  const presentSubgrediiit = await Subgrediiit.findOne({ name: subgrediiit })
  if (!presentSubgrediiit) {
    return res.sendStatus(404)
  }
  try {
    const posts = await Post.find({postedin : subgrediiit})
    console.log(req.params.subgrediiit)
    return res.json(posts)
  } catch(error){
    console.log(error)
    return res.sendStatus(400)
  }

  
}

async function upvote(req, res) {
  try {
    // Get the post ID from the request body
    const postid = req.body.postid;
    

    // Get the user making the upvote from the JWT
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

    // Check if the post exists
    const post = await Post.findById(postid);
    if (!post) {
      return res.sendStatus(404);
    }

    // Check if the user has already upvoted the post
    const upvotedIndex = post.upvote.indexOf(user.email);
    if (upvotedIndex !== -1) {
      // User has already upvoted the post, remove their email from the upvote array
      post.upvote.splice(upvotedIndex, 1);
    } else {
      // User has not upvoted the post, add their email to the upvote array
      const downvotedIndex = post.downvote.indexOf(user.email);
      if (downvotedIndex !== -1) {
        // User has previously downvoted the post, remove their email from the downvote array
        post.downvote.splice(downvotedIndex, 1);
      }
      post.upvote.push(user.email);
    }

    // Save the updated post to the database
    await post.save();
    

    // Send a response indicating the upvote was added successfully
    res.status(200).json({ message: 'Upvote added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getAllSave = async (req, res) => {
  let currentEmail = '';
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    currentEmail = decoded.email;
  });

  try {
    const user = await User.findOne({ email: currentEmail });
    if (!user) {
      return res.sendStatus(404);
    }

    const saved = await Save.find({ saver: user.email });
    
    const postIds = saved.map((save) => save.postid);
    
    const posts = await Post.find({ _id: { $in: postIds } });
    console.log(posts)
    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};


const unSave = async (req, res) => {
  
  const postId = req.params.postId;
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // invalid token
      }

      try {
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
          return res.sendStatus(404);
        }

        const savedPost = await Save.findOne({postid: req.body.postid, saver: user.email });

        if (!savedPost) {
          return res.sendStatus(404); // saved post not found
        }

        await savedPost.deleteOne({ postid: req.body.postid, saver: user.email });
        
        return res.sendStatus(204); // successfully removed saved post
      } catch (error) {
        console.error(error);
        return res.sendStatus(500);
      }
    }
  );
};



async function save(req, res) {

  const subgrediiit = req.params.subgrediiit;
  console.log(subgrediiit)

  // Get the user making the post from the JWT

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
    console.log("ere")
    return res.sendStatus(404);

  }
  const presentSubgrediiit = await Subgrediiit.findOne({ name: subgrediiit })
  if (!presentSubgrediiit) {
    return res.sendStatus(404)
  }

  // now i have the subgrediiit and the user that wants to save
  // add it to the database

  const saved_already = await Save.findOne({ saver: user.email, postid: req.body.postid })
  if (saved_already) {
    return res.sendStatus(200)
  }

  try {
    const newSave = new Save({
      saver: user.email,
      postid: req.body.postid
    })

    await newSave.save();


  } catch (err) {
    console.log(err)
  }


  return res.sendStatus(200)

}

async function downvote(req, res) {
  try {

    const postid = req.body.postid;
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


    const post = await Post.findById(postid);
    if (!post) {
      return res.sendStatus(404);
    }


    const downvotedIndex = post.downvote.indexOf(user.email);
    if (downvotedIndex !== -1) {

      post.downvote.splice(downvotedIndex, 1);
    } else {

      const upvotedIndex = post.upvote.indexOf(user.email);
      if (upvotedIndex !== -1) {

        post.upvote.splice(upvotedIndex, 1);
      }
      post.downvote.push(user.email);
    }


    await post.save();

    // Send a response indicating the upvote was added successfully
    res.status(200).json({ message: 'Downvote added successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function comment(req, res) {
  const { postid, text } = req.body;

  // Get the user making the comment from the JWT
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

  try {
    const post = await Post.findOne({ _id: postid });
    if (!post) {
      return res.sendStatus(404);
    }

    post.comments.push(text);
    await post.save();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}


async function followers(req, res) {
  console.log("Here")
  const subgrediiit = req.params.subgrediiit;
  try {
    let users = await Reader.find({grediiit: subgrediiit , status: "following" })
    console.log(users)
    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.sendStatus(404)
  }
}

async function blocked(req, res) {

  const subgrediiit = req.params.subgrediiit;
  try {
    let users = await Reader.find({ grediiit: subgrediiit, status: "blocked" })
    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.sendStatus(404)
  }


}

async function request(req, res) {
  const subgrediiit = req.params.subgrediiit;
  try {
    let users = await Reader.find({ status: "requested" , grediiit : subgrediiit})
    console.log(users)
    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.sendStatus(404)
  }
}


async function acceptRequest(req, res) {
  console.log("Here")
  const subgrediiit = req.params.subgrediiit
  try {
    console.log(req.body.follower)
    const item = await Reader.findOne({ follower: req.body.follower , grediiit : subgrediiit})
    if (!item) {
      return res.sendStatus(400)
    }
    
    // Process the request
    item.status = "following";
    await item.save();
    

    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}

async function rejectRequest(req, res) {
  const subgrediiit = req.params.subgrediiit
  try {
    const item = await Reader.findOne({ follower: req.body.follower })
    if (!item) {
      return res.sendStatus(400)
    }

    // Delete the Reader instance
    await Reader.deleteOne({follower: req.body.follower, grediiit : subgrediiit})

    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}


async function blockRequest(req, res) {

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

  const subgrediiit = req.params.subgrediiit
  try {
    const item = await Reader.findOne({follower: currentEmail, grediiit : subgrediiit})
    if (!item) {
      return res.sendStatus(400)
    }

    // Process the request
    item.status = "left";
    await item.save();

    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}



async function requestJoin(req, res) {
  
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

  let follower = user.email
  const grediiit = req.params.subgrediiit;

  

  try {
    const reader = await Reader.findOne({ follower : follower , grediiit : grediiit});
    console.log(reader)
    if (reader) {
      if (reader.status === 'following') {
        
        return res.status(400).send('Already following');
      }
      console.log(reader.status)
      return res.status(200).send('Other state present');
    } else {
      const newReader = new Reader({
        grediiit : grediiit,
        follower: follower ,
        status: 'requested',
      });
      
      await newReader.save();
      return res.status(200).send('Requested');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
}



module.exports = { getAllPosts, createPost, upvote, downvote, save, getAllSave, unSave, comment, followers, blocked, request, acceptRequest, rejectRequest, blockRequest, requestJoin }