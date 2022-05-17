const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const validation = require('../middlewares/validation/userValidate');
const { userAuthenticate } = require('../middlewares/authentication/authenticate');
const createUser = require('../validation/userValidation');
const roles = require('../helper/roles');
const uploadImage = require('../helper/imageUpload');

const userController = require('../controllers/users');
const bookController = require('../controllers/book');
const userBookController = require('../controllers/userBook');

//user auth
    router.post('/user/register', validation.validate(createUser.userSchema), userController.register);
    router.post('/user/login', validation.validate(createUser.userLoginSchema), userController.login);
    router.post('/user/logout', userAuthenticate(roles.student), userController.logout);
    router.get('/user', userAuthenticate(roles.student), userController.findOneUser);
    router.put('/user/update/:id', userAuthenticate(roles.student), userController.updateUser);
    router.delete('/user/delete/:id', userAuthenticate(roles.student), userController.deleteUser);

///book
    router.get('/books', userAuthenticate(roles.student), bookController.bookAllSearch);

///user buy book in library 
    router.get('/user/books', userAuthenticate(roles.student), userBookController.bookAllUser);
    router.get('/user/book/:id', userAuthenticate(roles.student), userBookController.UserBookOne);


module.exports = router;