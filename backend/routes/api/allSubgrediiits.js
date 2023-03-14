const express = require('express');
const router = express.Router();
const controller = require('../../controllers/grediiitsController');

router.route('/')
    .get(controller.getAllSubgrediiits)

    
    
module.exports = router;