const router = require('express').Router();
const { addNews, getNews } = require('../controlers/newsController');
const asyncHandler = require('express-async-handler');

router.route('/upload')
    .post(asyncHandler(addNews))

router.route('/')
    .get(asyncHandler(getNews))

module.exports = router;
