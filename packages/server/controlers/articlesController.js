
const articlesRepository = require('../repositories/articlesRepository')
const storageRepository = require('../repositories/storageRepository')
const articlesService = require('../services/articlesService')({ articlesRepository, storageRepository })
const createError = require('http-errors')

const addArticle = async (req, res, next) => {

    if (!req.file) {
        return next(createError(400, 'No file uploaded'))
    }

    const publicUrl = await articlesService.uploadImage(req.file)

    let slug = req.body.slug.toLowerCase().replace(/ /g, '-');

    const article = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        author_id: req.session.user.uid,
        slug,
        hero_image: publicUrl
    }

    await articlesService.insertNewArticle(article)

    res.json({
        message: 'Article added successfully',
        status: 'Success',
        data: {
            article
        }
    })
}

const getAllArticles = async (req, res) => {
    const news = await articlesService.getNewsArticles()
    res.json({
        status: 'Success',
        data: {
            news
        }
    })
}

const getArticleBySlug = async (req, res) => {
    const slug = req.params.slug
    const article = await articlesService.getArticleBySlug(slug)
    res.json({
        status: 'Success',
        data: {
            article
        }
    })
}

const checkSlugAvailability = async (req, res) => {
    const { slug } = req.body

    const checkedSlug = await articlesService.checkSlug(slug)

    const isTaken = checkedSlug.length ? true : false

    res.json({
        status: 'Success',
        data: {
            isTaken
        }
    })
}

module.exports = {
    addArticle,
    getAllArticles,
    getArticleBySlug,
    checkSlugAvailability
}



