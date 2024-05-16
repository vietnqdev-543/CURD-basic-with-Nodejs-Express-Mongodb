const mongoose = require('mongoose');

const likeProductSchema = new mongoose.Schema({
    idProduct : {type : String , require : true} ,
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    // sex: { type: String, required: true },
    // waterproof: { type: String, required: true },
    // size: { type: String, required: true },
    // quantity: { type: Number, required: true },
    // sold: { type: Number, required: true },
    // description: { type: String, required: true },
    // slider: [{ type: String, required: true }],
}, { timestamps: true });

const likeProductModal = mongoose.model("like product", likeProductSchema);
module.exports = likeProductModal;
