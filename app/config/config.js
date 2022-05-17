require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_DATABASE,
    dialect: "mysql",
    pool: {
        max: 5,             //max no of connection in pool
        min: 0,             //min no of connection in pool
        acquire: 30000,     //max time, in millisec, will try to get connection before throwing error
        idle: 10000         //max time, in millisec, connection can be idle before being released
    },

    PORT: process.env.PORT || 3000,

    BCRYPT_SALT: process.env.BCRYPT_SALT || 10,

    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'VRK2D0rFsHGJosZAmMW5LlujgLUSWxZwAoTcgo2gSaRttYPuPmbRWOaBh0mtQWts',

    JWT_EXPIRES_AT: process.env.JWT_EXPIRES_AT || '1d',

    JWT_TOKEN_SOURCE: 'auth-token'
};