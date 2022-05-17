const dbConfig = require('../config/config');
const Sequalize = require('sequelize');

const sequelize = new Sequalize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequalize = Sequalize;
db.sequelize = sequelize;
db.users = require("./users.js")(sequelize, Sequalize);
db.roles = require("./roles.js")(sequelize, Sequalize);
db.books = require("./book.js")(sequelize, Sequalize);
db.userBooks = require("./userBook.js")(sequelize, Sequalize);
db.reductions = require("./reduction.js")(sequelize, Sequalize);

db.userBooks.belongsTo(db.users, { foreignKey: 'user_id', as: 'user'});

db.userBooks.belongsTo(db.books, { foreignKey: 'book_id', as: 'book'});

module.exports = db;