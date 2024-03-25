const userModal = require('../models/userModel')





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
    callCreateUser   , callUpdateUser, callDeleteUser , callLoginUser
}