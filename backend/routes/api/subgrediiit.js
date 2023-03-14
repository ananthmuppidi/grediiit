const express = require('express');
const router = express.Router();
const grediiitController = require('../../controllers/grediiitController');

router.route('/')
  

router.route('/:subgrediiit')
    .post(grediiitController.createPost);
    
router.route('/:subgrediiit/upvote')
    .post(grediiitController.upvote)

router.route('/:subgrediiit/downvote')
    .post(grediiitController.downvote)

router.route('/:subgrediiit')
    .get(grediiitController.getAllPosts)

router.route('/:subgrediiit/save')
    .post(grediiitController.save)
    .get(grediiitController.getAllSave)
    router.route('/:subgrediiit/unsave')
    .post(grediiitController.unSave)
router.route('/:subgrediiit/comment')
    .post(grediiitController.comment)

router.route('/:subgrediiit/followers')
    .get(grediiitController.followers)

router.route('/:subgrediiit/requests')
    .get(grediiitController.request)


router.route('/:subgrediiit/blocked')
    .get(grediiitController.blocked)

router.route('/:subgrediiit/accept')
    .post(grediiitController.acceptRequest)

router.route('/:subgrediiit/leave')
    .get(grediiitController.blockRequest)

router.route('/:subgrediiit/reject')
    .post(grediiitController.rejectRequest)

router.route('/:subgrediiit/request')
    .get(grediiitController.requestJoin)









    
    
module.exports = router;