const db = require('../mysql/db')

async function insertNewPost(post) {
    const result = await db.query(`INSERT INTO posts SET ?`, [post])
    return result
}
async function getPostsByJarCode(jarCode) {
    const result = await db.query(`select a.post,
    a.post_id,
    a.post_date,
    b.email
from posts a
      left join users b on b.uid = a.author_id
where jarCode = ?
group by 1, 2,3, 4;`, [jarCode])
    return result
}

module.exports = {
    insertNewPost,
    getPostsByJarCode
}