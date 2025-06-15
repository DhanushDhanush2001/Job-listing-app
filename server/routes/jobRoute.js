const express = require('express');
const {getAllJobs, postJob} = require('../controllers/jobController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router()

router.route('/postJob').post(isAuthenticated,postJob);
router.route('/getAllJobs').get(getAllJobs);

module.exports = router;