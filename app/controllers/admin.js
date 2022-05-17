const db = require('../models');
const User = db.users;
const Roles = db.roles;
const Op = db.Sequalize.Op;

const { hashPassword, comparePassword } = require('../helper/passwordHelper');
const accessJwtToken = require('../services/jwt');

login = async (req, res) => {

    try {
    
        const { email, password } = req.body;

        const user = await User.scope('withHashedPassword').findOne({ where : {email} });

        const admin = await Roles.findOne({ where : {name: 'admin'} });

        if (user && (user.role_id == admin.id) && await comparePassword(password, user.password)) {

            const data = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                mobile: user.mobile,
                role_id: user.role_id
            }

            data.token = accessJwtToken.generateToken(data);

            return res.status(200).send({
                message: 'Login Successfully',
                data: data
            })
        }

        return res.status(400).send({
            message: 'Invalid Email and Password',
        })

    } catch (error) {
        throw error;   
    }

}

findOneUser = async (req,res) => {

    const user = await User.findOne({ where: {id: req.user.id } });

    if (user == null ) {

        return res.status(404).send({

            message: 'Admin Not Found'

        });

    } else {
         return res.status(200).send({

            message: 'Admin Details Fetched',
            data: user
            
        });
    }
}

logout = async (req, res) => {

    const tokenDestroy = await accessJwtToken.destroyToken(req.user.token);

    return res.status(200).send({
        message: 'Logout Successfully'
    });
}

module.exports = {
    login,
    findOneUser,
    logout
}
