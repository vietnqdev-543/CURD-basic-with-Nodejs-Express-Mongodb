const express = require('express')
const router = express.Router()
const {  callCreateUser , callLoginUser  , callUpdateUser , callDeleteUser  } = require('../controllers/userController')
const {getHomePage ,getCreateAUserPage, getViewListUserPage, getUpdatePage , getLoginPage, getProductPage} = require('../controllers/pageController')
const {callCreateProduct ,callUpdateProduct, callDeleteProduct } = require('../controllers/productController');

router.get('/' , getHomePage)   
router.get('/create' , getCreateAUserPage)   
router.get('/view' , getViewListUserPage)   
router.get('/update/:_id' , getUpdatePage)
router.get('/login' , getLoginPage)
router.get('/productPage' ,getProductPage)

//user
router.post('/user//createUser' , callCreateUser)
router.post('/user/loginUser' , callLoginUser)
router.post('/user/updateUser/:_id' , callUpdateUser )
router.post('/user//deleteUser/:_id' , callDeleteUser)


//product
router.post('/product/createProduct' , callCreateProduct)
router.post('/product/updateProduct/:_id' , callUpdateProduct)
router.post('/product/deleteProduct/:_id' , callDeleteProduct)

router
module.exports = router