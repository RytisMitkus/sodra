const router = require('express').Router();
const { addArticle, getAllArticles, getArticleBySlug, checkSlugAvailability } = require('../controlers/articlesController');
const asyncHandler = require('express-async-handler');
const processFile = require("../middleware/upload");


router.route('/')
    .get(asyncHandler(getAllArticles))

router.route('/check-slug')
    .get(asyncHandler(checkSlugAvailability))

router.route('/:slug')
    .get(asyncHandler(getArticleBySlug))

router.use(processFile)

router.route('/upload')
    .post(asyncHandler(addArticle))




module.exports = router;
