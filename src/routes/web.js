const express = require('express')
const router = express.Router()
const {getHomePage ,  callCreateUser , callLoginUser , getCreateAUserPage , getViewListUserPage , getUpdatePage , callUpdateUser , callDeleteUser , getLoginPage } = require('../controllers/homeController')

router.get('/' , getHomePage)   
router.get('/create' , getCreateAUserPage)   
router.get('/view' , getViewListUserPage)   
router.get('/update/:_id' , getUpdatePage)
router.get('/login' , getLoginPage)


router.post('/createUser' , callCreateUser)
router.post('/loginUser' , callLoginUser)
router.post('/updateUser/:_id' , callUpdateUser )
router.post('/deleteUser/:_id' , callDeleteUser)
module.exports = router