const createError = require('http-errors')

module.exports = ({
    newsRepository,
    storageRepository
}) => ({
    async insertNewArticle(newsArticle) {
        const article = await newsRepository.insertNewsArticle(newsArticle)

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
        const articles = await newsRepository.getNewsArticles()

        if (!articles) {
            return next(createError(400, 'Something went wrong'))
        }

        return articles
    }
})