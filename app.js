const express = require('express');
const cors = require('cors');
const config = require('./app/config/config');
const db = require('./app/models');
const routerUser = require('./app/routes/api');
const routerAdmin = require('./app/routes/admin');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use('/api', routerUser);

app.use('/admin', routerAdmin);

app.use(express.static('app/public/books'));

db.sequelize.sync();

app.get('/add', async (req, res) => {
    res.status(200).json({
        message: 'success'
    });
})

app.listen(config.PORT, () => {
    console.log(`App listen in port ${config.PORT}`)
})