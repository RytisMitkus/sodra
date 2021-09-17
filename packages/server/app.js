require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const app = express();

const dataRoutes = require('./routes/dataRoutes');

app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ company: false });
});

app.use('/api/data', dataRoutes)


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