const userModal = require('../models/userModel')
const { ObjectId } = require('mongodb');
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


const callCreateUser = (req ,res ) => {
    console.log('req.body :' , req.body)
    const newUser = new userModal({
    email : req.body.email ,
    name : req.body.name ,
    password : req.body.password ,
    phone : req.body.phone ,
    city : req.body.city

    })
    
    newUser.save()
    .then(()=>{
        console.log('Dữ liệu đã được lưu')
       res.redirect('/view')
    })
    .catch(()=>{
        console.log('Đã có lỗi')
        res.status(500).send('Đã có lỗi')
    })
}

const callLoginUser = async(req, res )=>{
    const {email , password} = req.body
    try {
        const emailT = await userModal.findOne({email})
        if (!emailT) {
            return res.status(401).send('Invalid email or password');
        }

        const passwordT = await userModal.findOne({password})
        if(!passwordT){
            return res.status(401).send('Invalid email or password')
        }
        res.redirect('/')
        
    } catch (error) {
        console.log(error)
        res.status(500).send('error')
    }
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
const callUpdateUser = async(req,res) => {
    try {
        const  {email , name ,password , phone , city} = req.body
        await userModal.findByIdAndUpdate(req.params._id , {email : email , name : name , password : password , phone : phone , city : city })
        res.redirect('/view')
    } catch (error) {
        console.log.error(error)
        res.status(500).send('Error')
    }

}
const callDeleteUser=async(req, res)=>{
    const id = req.params._id
    try {
        await userModal.findByIdAndDelete(id)
        res.redirect('/view')
        // res.send('Xoá thành công')
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}

module.exports = {
    getHomePage , getCreateAUserPage , getViewListUserPage , getLoginPage , callCreateUser  , getUpdatePage , callUpdateUser, callDeleteUser , callLoginUser
}