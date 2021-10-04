const router = require('express').Router();
const { newPost, getCompanyPosts } = require('../controlers/postsController')

router.route('/new')
    .post(newPost)

router.route('/companyposts/:jarCode')
    .get(getCompanyPosts)


module.exports = router;
