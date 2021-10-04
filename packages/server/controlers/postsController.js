const asyncHandler = require('express-async-handler')
const postsRepository = require('../repositories/postsRepository')
const postsService = require('../services/postsService')({ postsRepository })
const createError = require('http-errors')


const newPost = asyncHandler(async (req, res) => {

    const { uid } = req.session.user

    if (!uid) next(createError(401, 'Unauthorized'))

    let { jarCode, content } = req.body

    jarCode = Number(jarCode)

    const newPost = {
        author_id: uid,
        post: content,
        jarCode
    }
    postsService.insertNewPost(newPost)

    res.json({ success: true })
})

const getCompanyPosts = asyncHandler(async (req, res) => {

    const { jarCode } = req.params

    const posts = await postsService.getCompanyPostsByJarCode(jarCode)

    res.json({ posts })
})

module.exports = {
    newPost,
    getCompanyPosts
}