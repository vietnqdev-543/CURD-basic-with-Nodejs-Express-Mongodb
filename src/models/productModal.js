const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name : {type : String , require :true},
    brand : {type : String , require :true},
    price : {type : Number, require :true} ,
    description :{type : String , require :true} ,
    image : {type : String , require :true} ,
},
{
    timestamps : true 
}
)

const  productModal = mongoose.model("Product",productSchema)
module.exports = productModal