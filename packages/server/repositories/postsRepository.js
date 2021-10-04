const db = require('../mysql/db')

async function insertNewPost(post) {
    const result = await db.query(`INSERT INTO posts SET ?`, [post])
    return result
}
async function getPostsByJarCode(jarCode) {
    const result = await db.query(`SELECT * FROM posts WHERE jarCode = ?`, [jarCode])
    return result
}

module.exports = {
    insertNewPost,
    getPostsByJarCode
}