const router = require('express').Router();
const articlesRepository = require('../repositories/articlesRepository')
const storageRepository = require('../repositories/storageRepository')
const articlesService = require('../services/articlesService')({ articlesRepository, storageRepository })

const articlesController = require('../controllers/articlesController')({ articlesService });

const asyncHandler = require('express-async-handler');
const processFile = require("../middleware/upload");


router.route('/')
    .get(asyncHandler(articlesController.getAllArticles))

router.route('/check-slug')
    .get(asyncHandler(articlesController.checkSlugAvailability))

router.route('/:slug')
    .get(asyncHandler(articlesController.getArticleBySlug))

router.use(processFile)

router.route('/upload')
    .post(asyncHandler(articlesController.addArticle))


module.exports = router;
