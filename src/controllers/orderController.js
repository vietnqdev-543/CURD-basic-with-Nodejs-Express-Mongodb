const orderModel = require('../models/orderModal')
const createOrder = (req, res)=>{
    const {customerName , customerAdress , customerPhone , products , totalPrice } =req.body
    res.status(200).json({
        message : 'tạo đơn hàng thành công' ,   
        data : req.body
    })
}
module.exports = {createOrder}