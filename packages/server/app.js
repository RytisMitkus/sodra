require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mysqlSession = require('./utils/session')
const cors = require('cors')

const app = express();

const dataRoutes = require('./routes/dataRoutes');
const userRoutes = require('./routes/userRoutes');
const postsRoutes = require('./routes/postsRoutes');
const newsRoutes = require('./routes/newsRoutes');

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(mysqlSession);

app.use('/api/data', dataRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/news', newsRoutes)


app.use((err, req, res, next) => {
    if (err.status === 422) {
        res.status(422).json(err.errors)
        return
    }
    if (err.sqlState || err.sql || err.sqlMessage) {
        // Hide message from DB
        // eslint - disable - next - line no - param - reassign
        err.message = 'Error 500. Database error'
    }

    res.status(err.status || 500).json({
        error: err.status || 500,
        message: typeof err === 'string'
            ? err : err.message || 'Error 500. Internal server error',
    })
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});