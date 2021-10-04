const createError = require('http-errors')

module.exports = ({
    postsRepository,
}) => ({
    async insertNewPost(post) {
        const newPost = await postsRepository.insertNewPost(post)
        if (!newPost) {
            next(createError(500, 'Error while creating new post'))
        }
        return newPost
    },
})