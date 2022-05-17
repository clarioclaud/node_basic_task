const { JWT_TOKEN_SOURCE } = require('../../config/config');
const accessJwtToken = require('../../services/jwt');
const db = require('../../models');

const userAuthenticate = (role = null) => {

    return async (req, res, next) => {

        if (!req.headers.authorization) {

            return res.status(403).send({

                message: 'Authorization Token is required'

            });
        }

        const token = req.headers.authorization.split(" ")[1];

        try { 

            const decodeToken = accessJwtToken.verifyToken(token);

            const roles = (role === 'student') ?  await db.roles.findOne({where: {name: 'student' } }) : await db.roles.findOne({where: {name: 'admin'} });

            if (decodeToken && decodeToken.source === JWT_TOKEN_SOURCE && decodeToken.role_id === roles.id) {

                req.user = decodeToken;

                next();

            }else{

                return res.status(401).send({message: "Access denied"});
            }

        }catch(err) {
            throw err;
        }
        
    }
}

module.exports = {
    userAuthenticate  
};