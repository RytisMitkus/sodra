const router = require('express').Router();
const { newPost, getCompanyPosts } = require('../controllers/postsController')
const asyncHandler = require('express-async-handler')

router.route('/new')
    .post(asyncHandler(newPost))

router.route('/companyposts/:jarCode')
    .get(asyncHandler(getCompanyPosts))


module.exports = router;
