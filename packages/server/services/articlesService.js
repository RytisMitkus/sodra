const createError = require('http-errors')

module.exports = ({
    articlesRepository,
    storageRepository
}) => ({
    async insertNewArticle(newsArticle) {

        const article = await articlesRepository.insertNewsArticle(newsArticle)

        if (article.affectedRows === 0) {
            return next(createError(400, 'Something went wrong'))
        }

        return article.insertId
    },

    async uploadImage(file) {
        const imageUrl = await storageRepository.uploadFileToGoogleCloudStorage(file)

        if (!imageUrl) {
            return next(createError(400, 'Something went wrong'))
        }

        return imageUrl
    },

    async getNewsArticles() {
        const articles = await articlesRepository.getNewsArticles()

        if (!articles) {
            return next(createError(400, 'Something went wrong'))
        }

        return articles
    },
    async getArticleBySlug(slug) {

        const article = await articlesRepository.getArticleBySlug(slug)

        return article
    },
    async checkSlug(slug) {
        const isTaken = await articlesRepository.checkIfSlugIsTaken(slug)

        return isTaken
    }

})