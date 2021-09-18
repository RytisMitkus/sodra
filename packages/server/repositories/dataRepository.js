const db = require('../mysql/db')

async function getLatestData() {
    return (await db.query(`SELECT a.jarCode, a.name, d.numInsured, SUM(b.tax) as taxes 
    FROM companies a 
    LEFT JOIN 2021_data b ON b.jarCode = a.jarCode 
    LEFT JOIN (SELECT jarCode, max(month) as month FROM 2021_data GROUP BY jarCode) c ON c.jarCode=a.jarCode 
    LEFT JOIN 2021_data d ON d.jarCode = a.jarCode and d.month = c.month GROUP BY 1, 2, 3 ORDER BY taxes DESC;`))
}

module.exports = { getLatestData }


