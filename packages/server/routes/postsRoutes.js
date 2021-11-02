const router = require('express').Router();
const asyncHandler = require('express-async-handler')

const postsRepository = require('../repositories/postsRepository')
const postsService = require('../services/postsService')({ postsRepository })
const postsController = require('../controllers/postsController')({ postsService })

router.route('/new')
    .post(asyncHandler(postsController.newPost))

router.route('/companyposts/:jarCode')
    .get(asyncHandler(postsController.getCompanyPosts))


module.exports = router;
