const db = require('../models');
const User = db.users;
const Op = db.Sequalize.Op;

const { hashPassword, comparePassword } = require('../helper/passwordHelper');
const accessJwtToken = require('../services/jwt');

class UserModel {
    //exports.creates = async (req, res) => {
   creates = async (req, res) => {

    const { first_name, last_name, email, mobile } = req.body;

        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: await hashPassword(req.body.password),
            mobile: req.body.mobile,
            role_id: req.body.role_id
        }
    
        User.create(user)

            .then(data => {

                res.status(200).send({
                    message: 'User Added Successfully',
                    data: data
                });
            })
            .catch(err => {

                res.status(500).send({

                    message: err.message || "Some error occured"

                });

            });
    };


    register = async (req, res) => {

        const { first_name, last_name, email, mobile, role_id } = req.body;
    
            const user = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: await hashPassword(req.body.password),
                mobile: req.body.mobile,
                role_id: req.body.role_id
            }
        
            User.create(user)
    
                .then(data => {
    
                    const result = { id: data.id, first_name, last_name, email, mobile, role_id }
    
                    result.token = accessJwtToken.generateToken(result);
    
                    res.status(200).send({
                        message: 'User Added Successfully',
                        data: result
                    });
                })
                .catch(err => {
    
                    res.status(500).send({
    
                        message: err.message || "Some error occured"
    
                    });
    
                });
    };

    login = async (req, res) => {

        try {
        
            const { email, password } = req.body;

            const user = await User.scope('withHashedPassword').findOne({ where : {email} });

            if (user && await comparePassword(password, user.password)) {

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

                message: 'User Not Found'

            });

        } else {
             return res.status(200).send({

                message: 'User Details Fetched',
                data: user
                
            });
        }
    }

    findUser = async (req,res) => {

        if (!req.params.id) {

            return res.status(202).send({

                message: 'User Id required'

            });
        }

        const user = await User.findOne({ where: {id: req.params.id } });

        if (user == null ) {

            return res.status(404).send({

                message: 'User Not Found'

            });

        } else {
             return res.status(200).send({

                message: 'User Details Fetched',
                data: user
                
            });
        }
    }


    findAllUser = async (req, res) => {

        const books = await User.findAndCountAll({
            order: [
                ['id', 'DESC']
            ]
        }).then(result => {

            return res.status(200).send({
                message: 'Details Fetched',
                data: result
            });

        }).catch(err => {

            return res.status(404).send({
                message: err.message
            });

        });
    }

    updateUser = async (req, res) => {

        const userExist = await User.findOne({ where: {id: req.params.id} });

        if (userExist) {

            const user = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: await hashPassword(req.body.password),
                mobile: req.body.mobile,
                role_id: req.body.role_id
            }
    
            const update = await User.update(
                user, 
                {
                    where: { id: req.params.id }
                }
            ).then(data => {
                return res.status(200).send({
                
                    message: 'Updated Successfully',
                   // data: data
    
                });
            }).catch(err => {
                return res.status(500).send({
                
                    message: err.message,
    
                })
            });
            

        }else {

            return res.status(404).send({
                
                message: 'User Not found to update'

            });
        }

        
    }

    deleteUser = async (req, res) => {

        const userExist = await User.findOne({ where: {id: req.params.id} });

        if (userExist) {

            await userExist.destroy().then(data => { 
              
                return res.status(200).send({

                    message : 'Deleted Successfully'

                });
            }).catch(err => {

                return res.status(500).send({

                    message : err.message

                });
            })
        } 
    }

    logout = async (req, res) => {

        const tokenDestroy = await accessJwtToken.destroyToken(req.user.token);
    
        return res.status(200).send({
            message: 'Logout Successfully'
        });
    }
}

module.exports = new UserModel();
