const express = require('express');
const router = express.Router();
const profileContoller = require('../../controllers/profileController');

router.route('/')
    .get(profileContoller.getCurrentProfile)
    .put(profileContoller.setCurrentProfile)
    
module.exports = router;