const createError = require('http-errors')

module.exports = ({ articlesService }) => {
    const controller = {}


    controller.addArticle = async (req, res, next) => {

        if (!req.file) {
            return next(createError(400, 'No file uploaded'))
        }

        const publicUrl = await articlesService.uploadImage(req.file)
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

        await articlesService.insertNewArticle(news)

        res.json({
            message: 'Article added successfully',
            status: 'Success',
            data: {
                news
            }
        })
    }

    controller.getAllArticles = async (req, res) => {
        const news = await articlesService.getNewsArticles()
        res.json({
            status: 'Success',
            data: {
                news
            }
        })
    }

    controller.getArticleBySlug = async (req, res) => {
        const slug = req.params.slug
        const article = await articlesService.getArticleBySlug(slug)
        res.json({
            status: 'Success',
            data: {
                article
            }
        })
    }

    controller.checkSlugAvailability = async (req, res) => {
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

    return controller
}