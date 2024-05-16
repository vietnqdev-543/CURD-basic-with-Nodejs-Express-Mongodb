const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
        customerId: { type: String, required: true },
        customerName: { type: String, required: true },
        customerAvatar: { type: String, required: true },
        text: { type: String, required: true },
        rate: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } 

}, { timestamps: true });

const commentModel = mongoose.model("Product", commentSchema);
module.exports =  commentModel
