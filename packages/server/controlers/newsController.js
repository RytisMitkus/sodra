const asyncHandler = require('express-async-handler')
const processFile = require("../middleware/upload");
const newsRepository = require('../repositories/newsRepository')
const storageRepository = require('../repositories/storageRepository')
const newsService = require('../services/newsService')({ newsRepository, storageRepository })
const createError = require('http-errors')



const addNews = asyncHandler(async (req, res, next) => {

    await processFile(req, res).catch(err => {
        return next(createError(400, err.message))
    });


    if (!req.file) {
        return next(createError(400, 'No file uploaded'))
    }

    const publicUrl = await newsService.uploadImage(req.file)

    let slug = req.body.slug.toLowerCase().replace(/ /g, '-');

    const news = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        author_id: req.session.user.uid,
        slug,
        hero_image: publicUrl
    }

    const insertedNewsArticleId = await newsService.insertNewArticle(news)

    res.json({
        articleId: insertedNewsArticleId,
        message: 'News added successfully',
        status: 'success',
        data: {
            news
        }
    })
})

const getNews = asyncHandler(async (req, res, next) => {
    const news = await newsService.getNewsArticles()
    res.json({
        status: 'success',
        data: {
            news
        }
    })
})

//TO DO
// 3. Fix all possible bugs

module.exports = {
    addNews,
    getNews
}



