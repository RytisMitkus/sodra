const db = require('../mysql/db')

async function insertNewPost(post) {
    const result = await db.query(`INSERT INTO posts SET ?`, [post])
    return result
}

module.exports = {
    insertNewPost
}