const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    customerId : {
    type:String , 
    require : true 
  } ,
    customerName: {
      type: String,
      required: true,
    },
    customerAdress: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    totalPrice : {
      type : Number ,
      require: true ,
    } ,
    paymentMethod : {
      type: String,
      enum: ["bank" , "cash"],
      default: "cash",
    },
    detailProduct: {
      type : Array ,
      name: {
        type: String,
        required: true,
      },
      quantity : {
        type : Number ,
        require: true ,
      },
      price: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["confirm", "shipping", "succes", "cancel"],
      default: "comfirm",
    },
  },
  { timestamps: true }
);
const orderModel = mongoose.model("orderSchema", orderSchema);
module.exports = orderModel;
