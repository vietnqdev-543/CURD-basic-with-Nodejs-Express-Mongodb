const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name : {type : String , require :true},
    brand : {type : String , require :true},
    sex : {type : String , require :true},
    price : {type : Number, require :true} ,
    waterproof : {type : String , require : true} ,
    size : {type : String, require :true} ,
    quantity: {type : Number , require : true} , 
    sold : {type : Number , require : true } ,
    description :{type : String , require :true} ,
    slider : [{type : String , require :true}], 
    image : {type : String , require :true} ,
},
{
    timestamps : true 
}
)

const  productModal = mongoose.model("Product",productSchema)
module.exports = productModal