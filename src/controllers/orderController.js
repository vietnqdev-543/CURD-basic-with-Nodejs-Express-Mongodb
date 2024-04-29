const orderModel = require('../models/orderModal')
const productModal = require('../models/productModal')
const callCreateOrder = (req, res)=>{
    const newOrder = new orderModel({
        customerId : req.body.customerId  ,
            customerName : req.body.customerName  ,
            customerAdress : req.body.customerAdress  ,
            customerPhone : req.body.customerPhone  ,
            totalPrice : req.body.totalPrice,
            paymentMethod : 'cash' ,
            status :'confirm',
            detailProduct : req.body.detailProduct
    })
        newOrder.save()

    try {
        res.status(200).json({
            message : 'tạo đơn hàng thành công' ,   
            data : newOrder
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

const callFetchAllOrder = async(req,res)=>{
    const listOrder = await orderModel.find({})
    try {
        res.status(200).json({
            message : 'fetch ok' ,
            data : listOrder
        })
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}
const callGetOrderById = async (req, res) => {
    const customerId = req.params._id; // Corrected parameter name
    try {
        const listOrderById = await orderModel.find({ customerId: customerId }); // Corrected query

        if (!listOrderById) { // Check if no orders found
            return res.status(404).json({ message: 'No orders found for the specified customer ID' });
        }

        res.status(200).json({
            message: 'Fetch order by ID successful',
            data: listOrderById
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const callSetStatusOrder = async(req, res)=>{
    const {_id , status} = req.body
    const orderStatus = await orderModel.findByIdAndUpdate(_id ,{status : status})
    try {
        res.status(200).json({
            message:'set status  succesfully',
            data : orderStatus
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

const callCancelOrder = async(req, res) => {
    const _id = req.params._id
    const order = await orderModel.findByIdAndUpdate(_id ,{status : 'cancel'})
    try {
        res.status(200).json({status : 'ok' , data : order})
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {callCreateOrder , callFetchAllOrder, callGetOrderById , callSetStatusOrder , callCancelOrder }