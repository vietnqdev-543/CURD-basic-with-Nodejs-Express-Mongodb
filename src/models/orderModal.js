const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
      },
      customerAdress: {
        type: String,
        required: true
      },
      customerPhone: {
        type: String,
        required: true
      },
      products: {
        type: Array,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending'
      }
},
{timestamps:true})
const orderModel = mongoose.model('orderSchema', orderSchema)
module.exports = orderModel