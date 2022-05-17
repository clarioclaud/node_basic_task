const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY, JWT_TOKEN_SOURCE, JWT_EXPIRES_AT } = require('../config/config');

const generateToken = (user) => {
    try {

        const payload = {
            source: JWT_TOKEN_SOURCE,
            ...user
        }

        return jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn: JWT_EXPIRES_AT,
          }
        );

    } catch (error) {

        throw error;

    }
}

const verifyToken = (token) => {

    try {

        return jwt.verify(token, JWT_SECRET_KEY);

    } catch (error) {

        throw error;
    }
    
}

const destroyToken = (token) => {
    try {

        return jwt.destroy(token);

    } catch (error) {

        throw error;

    }
}

module.exports = {
    generateToken,
    verifyToken,
    destroyToken
}

