const userModal = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');






const callCreateUser = async (req, res) => {
    
    try {
        const { email, name, password, phone } = req.body;
        const existingUser = await userModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new userModal({
            email,
            name,
            // password: hashedPassword,
            password ,
            phone,
            isAdmin: false
        });

        await newUser.save();


        // Send success response with tokens
        return res.status(201).json({ 
            message: 'User created successfully', 
        });
    } catch (error) {
        // Handle any errors
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

const callAuthenticatedToken = (req , res, next) => {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// const callUpdateUser = async(req,res) => {
//     try {
//         const  {email , name ,password , phone , city} = req.body
//         await userModal.findByIdAndUpdate(req.params._id , {email : email , name : name , password : password , phone : phone , city : city })
//         res.redirect('/view')
//     } catch (error) {
//         console.log.error(error)
//         res.status(500).send('Error')
//     }

// }
const callUpdateUser = async(req , res) => {
    const {id , email , name , phone} = req.body
    try {
        const userUpdate = await userModal.findByIdAndUpdate(id , {email : email , name : name , phone : phone})
        res.status(200).json({
            status : 'ok bro',
            user : userUpdate
        }
        )
    } catch (error) {
        res.status(500).send('Lỗi rồi thèn loz')
    }
}
const callDeleteUser=async(req, res)=>{
    const id = req.params._id
    try {
        await userModal.findByIdAndDelete(id)
       res.status(200).send('Xoá tài khoản thành công')
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
    callCreateUser   , callUpdateUser, callDeleteUser , callLoginUser , callAuthenticatedToken , callLogoutUser , callFetchAllUser
}