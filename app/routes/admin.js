const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const validation = require('../middlewares/validation/userValidate');
const { userAuthenticate } = require('../middlewares/authentication/authenticate');

const createUser = require('../validation/userValidation');
const createUserBook = require('../validation/userBookValidation');

const roles = require('../helper/roles');
const uploadImage = require('../helper/imageUpload');

const userController = require('../controllers/users');
const bookController = require('../controllers/book');
const adminController = require('../controllers/admin');
const userBookController = require('../controllers/userBook');
const reductionController = require('../controllers/reduction');

///admin login
router.post('/login', validation.validate(createUser.userLoginSchema), adminController.login);
router.get('/profile', userAuthenticate(roles.admin), adminController.findOneUser);
router.post('/logout', userAuthenticate(roles.admin), adminController.logout);

///book crud
router.post('/book/add', userAuthenticate(roles.admin), uploadImage.upload.single('image'), bookController.create);
router.post('/book/update/:id', userAuthenticate(roles.admin), uploadImage.upload.single('image'), bookController.updateBook);
router.get('/book/:id', userAuthenticate(roles.admin), bookController.bookOne);
router.delete('/book/delete/:id', userAuthenticate(roles.admin), bookController.bookDelete);
router.get('/books/all', userAuthenticate(roles.admin), bookController.bookAll);

///user list
router.post('/user/add', userAuthenticate(roles.admin), validation.validate(createUser.userSchema), userController.creates);
router.get('/users', userAuthenticate(roles.admin), userController.findAllUser);
router.get('/user/:id', userAuthenticate(roles.admin), userController.findUser);
router.put('/user/update/:id', userAuthenticate(roles.admin), userController.updateUser);
router.delete('/user/delete/:id', userAuthenticate(roles.admin), userController.deleteUser);


///user buy book
router.post('/userbook/add', userAuthenticate(roles.admin), validation.validate(createUserBook.userBookSchema), userBookController.create);
router.post('/userbook/update/status/:id/:is_damage', userAuthenticate(roles.admin), userBookController.updateUserBook);
router.get('/userbook/:id', userAuthenticate(roles.admin), userBookController.UserBookOne);
router.get('/userbooks/all', userAuthenticate(roles.admin), userBookController.UserBookAll);
router.delete('/userbooks/delete/:id', userAuthenticate(roles.admin), userBookController.UserBookDelete);

//reduction manage
router.post('/reduction/add', userAuthenticate(roles.admin), reductionController.create);
router.put('/reduction/update/:id', userAuthenticate(roles.admin), reductionController.updateReduction);
router.get('/reduction', userAuthenticate(roles.admin), reductionController.getReduction);

module.exports = router;
