const router = require('express').Router();
const { addNews, getNews } = require('../controlers/newsController');


router.route('/upload')
    .post(addNews)

router.route('/')
    .get(getNews);

module.exports = router;
