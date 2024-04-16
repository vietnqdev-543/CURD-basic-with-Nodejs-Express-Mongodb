const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    brand : {type : String , require :true},
    country: {type : String , require :true},
},
{
    timestamps : true 
}
)

const  categoryModal = mongoose.model("category",categorySchema)
module.exports = categoryModal