
const createError = require('http-errors')

module.exports = ({ postsService }) => {

    const controller = {}

    controller.newPost = async (req, res) => {

        const { uid } = req.session.user

        if (!uid) next(createError(401, 'Unauthorized'))

        let { jarCode, content, parentId } = req.body

        jarCode = Number(jarCode)

        const newPost = {
            author_id: uid,
            post: content,
            jarCode,
            parent_post_id: parentId ? Number(parentId) : ''
        }

        await postsService.insertNewPost(newPost)

        res.json({ success: true })
    }

    controller.getCompanyPosts = async (req, res) => {

        const { jarCode } = req.params

        const posts = await postsService.getCompanyPostsByJarCode(jarCode)

        res.json({ posts })
    }
    return controller
}