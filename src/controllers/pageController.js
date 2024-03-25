const userModal = require('../models/userModel')
const productModal = require('../models/productModal')
const getHomePage = (req , res) =>{
    res.render('home.ejs')
}   
const getCreateAUserPage = (req , res) => {
    res.render('createUser.ejs')
}
const getLoginPage = (req, res) => {
    res.render('login.ejs')
}
const getViewListUserPage = (req , res) => {
    userModal.find({})
    .then(listUsers => {
        res.render('viewListUser.ejs', { users: listUsers });
      
    })
    .catch(err => {
      console.error('Lỗi khi truy vấn tài khoản:', err);
      res.status(500).send('Đã có lỗi xảy ra');
    });
}
const getUpdatePage = ( req, res ) => {
    const userID = req.params._id
    console.log(userID)
    userModal.findOne({ _id: userID })
        .then(user => {
            if (!user) {
                console.log('User not found');
                return res.status(404).send('User not found');
            }

            // Nếu tìm thấy user, render trang update với thông tin của user
            res.render('update.ejs', { user });
            console.log('thông tin tài khoản :' , user);
        })
        .catch(err => {
            console.error('Error occurred while finding user', err);
            res.status(500).send('Internal Server Error');
        });
}

const getProductPage = (req,res)=>{
    productModal.find({})
    .then(listProducts => {
        res.render('productPage.ejs', { products: listProducts });  
    })
    .catch(err => {
      console.error('error:', err);
      res.status(500).send('Đã có lỗi xảy ra');
    });
}
 module.exports= {getHomePage, getCreateAUserPage, getLoginPage, getViewListUserPage, getUpdatePage , getProductPage}; 