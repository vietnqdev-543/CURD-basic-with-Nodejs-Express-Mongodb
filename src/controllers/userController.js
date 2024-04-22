const userModal = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const callCreateUser = async (req, res) => {  
    try {
        const { email, name, password, phone } = req.body;
        const existingUser = await userModal.findOne({ email }); // Đợi cho promise được giải quyết
        
        if(existingUser) {
            res.status(500).send("Email này đã tồn tại");
            return;
        }
        const newUser = new userModal({
            email,
            name,
            password ,
            phone,
            isAdmin: false
        });

        await newUser.save();
        return res.status(201).json({ 
            message: 'User created successfully', 
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const callLoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Tìm người dùng dựa trên email
        const user = await userModal.findOne({ email });
         // Generate JWT tokens
         const access_token = jwt.sign({ email: user.email, userId: user._id }, 'your_secret_key', { expiresIn: '15m' });
         const refresh_token = jwt.sign({ email: user.email, userId: user._id }, 'your_refresh_secret_key', { expiresIn: '7d' });
        
        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Nếu mọi thứ đều đúng, trả về thông báo thành công
        return res.status(200).json({
            success: true,
            message: 'Login successfully' ,
            users :user   , 
            access_token,
            refresh_token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const callUpdateUser = async(req , res) => {
    const {id , email , name  , phone , avatar} = req.body
    try {
        const userUpdate = await userModal.findByIdAndUpdate(id , {email : email , name : name , phone : phone , avatar : avatar}, { new: true })
        res.status(200).json({
            status : 'Cập nhật thông tin thành công',
            user : userUpdate
        }
        )
    } catch (error) {
        res.status(500).send(error)
    }
}


const callChangePassword = async(req , res) => {
    const {id , password , newPassword} = req.body
    try {
         const passwordUpdate = await userModal.findByIdAndUpdate(id , {password : newPassword}, { new: true })
        res.status(200).json({
            status : 'Cập nhật thông tin thành công',
            userUpdate : passwordUpdate     
        }
        )
    } catch (error) {
        res.status(500).send(error)
    }
}

// const callChangePassword = async (req, res) => {
//     const { id, password, newPassword } = req.body;
    
//     try {
//         // Kiểm tra mật khẩu hiện tại có đúng không
//         const user = await userModal.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: 'Tài khoản không tồn tại' });
//         }
//         const isPasswordCorrect = await compare(password, user.password);
//         if (!isPasswordCorrect) {
//             return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
//         }
//         // Cập nhật mật khẩu mới
//         const passwordUpdate = await userModal.findByIdAndUpdate(id , {password : newPassword}, { new: true })

//         // Trả về kết quả
//         res.status(200).json({
//             message: 'Change password success',
//             data: passwordUpdate
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// };

const callDeleteUser = async(req, res)=>{
    const _id = req.params
    try {
        await userModal.findByIdAndDelete(_id)
         return res.status(200).send('Xoá tài khoản thành công')
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}

const callLogoutUser = ( req,res) => {
    try {
        res.status(200).send('Đăng xuất thành công')
    } catch (error) {
        res.status(500).send(error)
    }
}

const callFetchAllUser = async(req, res) => {
    const listUsers = await userModal.find({})
    try {
        res.status(200).send(listUsers)
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    callCreateUser   , callUpdateUser, callDeleteUser , callLoginUser  , callLogoutUser , callFetchAllUser , callChangePassword 
}