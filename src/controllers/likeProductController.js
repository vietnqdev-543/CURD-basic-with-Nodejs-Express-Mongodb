const likeProductModal = require('../models/likeProductModel');

const callCreateLikeProduct = async (req, res) => {
    const values = req.body;

    try {
        const existingProduct = await likeProductModal.findOne({ idProduct: values._id });

        if (existingProduct) {
            res.status(200).json({
                message: 'Bạn đã lưu sản phẩm vào danh sách yêu thích rồi',
                data: existingProduct,
            });
        } else {
            const newLikeProduct = new likeProductModal({
                idProduct: values._id,
                name: values.name,
                image: values.image,
                price: values.price,
                brand: values.brand
            });

            await newLikeProduct.save();

            res.status(200).json({
                status : 'ok',
                message: 'Thêm sản phẩm vào danh sách yêu thích thành công',
                data: newLikeProduct,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
const callFetchAllLikeProduct = async(req, res) => {
    const listAllLikeProduct = await likeProductModal.find({})
    try {
        res.status(200).json({
            message : 'fetch success',
            data : listAllLikeProduct
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = { callCreateLikeProduct , callFetchAllLikeProduct};
