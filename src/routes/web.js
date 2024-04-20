const express = require('express')
const router = express.Router()
const {getHomePage ,getCreateAUserPage, getViewListUserPage, getUpdatePage , getLoginPage, getProductPage} = require('../controllers/pageController')
const {  callCreateUser , callLoginUser  , callUpdateUser , callDeleteUser, callLogoutUser , callFetchAllUser , callChangePassword } = require('../controllers/userController')
const {callCreateProduct ,callUpdateProduct, callDeleteProduct , callFetchAllProduct, callFetchProductById, callHandleUpLoadFile } = require('../controllers/productController');
const { callCreateCategory, callFetchAllCategory } = require('../controllers/categoryController');
const { callUploadImage , callGetImage} = require('../controllers/imageController');

router.get('/' , getHomePage)   
router.get('/create' , getCreateAUserPage)   
router.get('/view' , getViewListUserPage)   
router.get('/update/:_id' , getUpdatePage)
router.get('/login' , getLoginPage)
router.get('/productPage' ,getProductPage)

//user
router.post('/user/createUser' , callCreateUser)
router.post('/user/loginUser' , callLoginUser)
router.post('/user/updateUser' , callUpdateUser )
router.post('/user/changePassword' , callChangePassword)
router.post('/user/logoutUser' , callLogoutUser)
router.get('/user/fetchAllUser' , callFetchAllUser)
router.post('/user/deleteUser/:_id' , callDeleteUser)



//product
router.post('/product/createProduct' , callCreateProduct)
router.post('/product/updateProduct' , callUpdateProduct)
router.get('/product/fetchAllProduct' , callFetchAllProduct)
router.post('/product/deleteProduct/:_id' , callDeleteProduct)
router.get('/product/fetchProductById/:id' , callFetchProductById)
router.post('/product/uploadFile' , callHandleUpLoadFile)

//category
router.post('/category/createCategory', callCreateCategory)
router.get('/category/fetchAllCategory', callFetchAllCategory)

//image
router.post('/image/uploadImage', callUploadImage)
router.get('/image/getImage' , callGetImage)


module.exports = router