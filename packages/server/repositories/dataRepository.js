const db = require('../mysql/db')

async function getLatestData() {
    return (await db.query(`
    SELECT a.jarCode, a.name, a.jobs, d.numInsured, SUM(b.tax) as taxes 
    FROM companies a 
    LEFT JOIN 2021_data b ON b.jarCode = a.jarCode 
    LEFT JOIN (SELECT jarCode, max(month) as month FROM 2021_data GROUP BY jarCode) c ON c.jarCode=a.jarCode 
    LEFT JOIN 2021_data d ON d.jarCode = a.jarCode and d.month = c.month GROUP BY 1, 2, 3, 4 ORDER BY taxes DESC;`))
}

async function getOneCompanyData(jarCode) {
    return (await db.query(`SELECT a.month, a.numInsured, a.avgWage, b.name, b.id
    FROM all_data a
             LEFT JOIN companies b on a.jarCode = b.jarCode
    WHERE a.jarCode = ?
    ORDER BY month DESC`, [jarCode, jarCode, jarCode, jarCode]))
}
async function getCompanyName(jarCode) {
    return (await db.query(`SELECT name FROM companies WHERE jarCode = ?`, [jarCode]))
}

module.exports = { getLatestData, getOneCompanyData, getCompanyName }