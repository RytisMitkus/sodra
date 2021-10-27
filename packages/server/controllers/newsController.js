const processFile = require("../middleware/upload");
const newsRepository = require('../repositories/newsRepository')
const storageRepository = require('../repositories/storageRepository')
const newsService = require('../services/newsService')({ newsRepository, storageRepository })
const createError = require('http-errors')



const addNews = async (req, res, next) => {

    await processFile(req, res).catch(err => {
        return next(createError(400, err.message))
    });


    if (!req.file) {
        return next(createError(400, 'No file uploaded'))
    }

    const publicUrl = await newsService.uploadImage(req.file)
    console.log(publicUrl);
    let slug = req.body.slug.toLowerCase().replace(/ /g, '-');

    const news = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        author_id: req.session.user.uid,
        slug,
        hero_image: publicUrl
    }

    await newsService.insertNewArticle(news)

    res.json({
        message: 'Article added successfully',
        status: 'Success',
        data: {
            news
        }
    })
}

const getNews = async (req, res) => {
    const news = await newsService.getNewsArticles()
    res.json({
        status: 'Success',
        data: {
            news
        }
    })
}

//TO DO
// 3. Fix all possible bugs

module.exports = {
    addNews,
    getNews
}



