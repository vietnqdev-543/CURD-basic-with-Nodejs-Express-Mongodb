const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    sex: { type: String, required: true },
    price: { type: Number, required: true },
    waterproof: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    sold: { type: Number, required: true },
    description: { type: String, required: true },
    slider: [{ type: String, required: true }],
    image: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

const productModal = mongoose.model("Product", productSchema);
module.exports = productModal;
