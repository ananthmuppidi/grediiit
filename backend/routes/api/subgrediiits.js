const express = require('express');
const router = express.Router();
const mySubgrediiitController = require('../../controllers/mysubgrediiitsController');

router.route('/')
    .get(mySubgrediiitController.getAllSubgrediiits)
    .post(mySubgrediiitController.createSubgrediiit)
    .put(mySubgrediiitController.deleteSubgrediiit)
    
    
module.exports = router;