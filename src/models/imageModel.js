const mongoose = require('mongoose')
const imageSchema = new mongoose.Schema({
    image : {type : String , require :true} ,
},
)

const  imageModel = mongoose.model("Image",imageSchema)
module.exports =  imageModel