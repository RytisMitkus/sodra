const router = require('express').Router();
const { newPost } = require('../controlers/postsController')

router.route('/new')
    .post(newPost)

module.exports = router;
