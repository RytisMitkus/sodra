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
    async getCompanyPostsByJarCode(jarCode) {
        const posts = await postsRepository.getPostsByJarCode(jarCode)
        if (!posts) {
            res.json({
                message: 'No posts found',
            })
        }
        return posts
    }
})