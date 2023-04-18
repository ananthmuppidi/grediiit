const express = require('express');
const router = express.Router();
const followerController = require('../../controllers/followersController');

router.route('/')
    .post(followerController.follow)
    .get(followerController.getFollowers)
    .delete(followerController.getFollowing)
router.route('/delete')
    .post(followerController.removeFollowing)
router.route('/delete/removefollower')
    .post(followerController.removeFollower)
    
    
module.exports = router;