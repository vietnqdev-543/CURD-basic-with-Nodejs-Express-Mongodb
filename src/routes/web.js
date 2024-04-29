const express = require('express')
const router = express.Router()

const {  callCreateUser , callLoginUser  , callUpdateUser , callDeleteUser, callLogoutUser , callFetchAllUser , callChangePassword } = require('../controllers/userController')

const {callCreateProduct ,callUpdateProduct, callDeleteProduct , callFetchAllProduct, callFetchProductById, callHandleUpLoadFile } = require('../controllers/productController');

const { callCreateCategory, callFetchAllCategory } = require('../controllers/categoryController');

const { callCreateOrder, callFetchAllOrder, callGetOrderById, callSetStatusOrder, callCancelOrder } = require('../controllers/orderController');

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

//order
router.post('/order/createOrder' , callCreateOrder)
router.get('/order/fetchAllOrder' , callFetchAllOrder)
router.get('/order/getOrderById/:_id', callGetOrderById)
router.post('/order/setStatusOrder', callSetStatusOrder)
router.post('/order/cancelOrder/:_id', callCancelOrder)



module.exports = router