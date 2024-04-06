const productModal = require('../models/productModal')

const callCreateProduct = (req,res) => {
    const newProduct = new productModal({
        name: req.body.name, 
        price: req.body.price,
        brand : req.body.brand ,
        sex : req.body.sex ,
        waterproof : req.body.waterproof ,
        size : req.body.size ,
        image : req.body.image , 
        description : req.body.description ,
    })
    newProduct.save()
    try {
        console.log('tạo product thành công')
        res.status(200).send('create product success')
        // res.redirect('/productPage')
        // location.reload(true)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error while creating a new Product')
    }
}

const callUpdateProduct = async(req, res) => {
    const {_id , name , brand , price , sex , waterproof , size , image , description} = req.body
    try {
        const productUpdate = productModal.findByIdAndUpdate({_id , name : name , brand :  brand , price : price , sex : sex , waterproof : waterproof , size : size , image : image , description : description })
        res.status(200).json({
            status : 'UpdateSuccesFully', 
            userUpdate : productUpdate
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

const callDeleteProduct = async(req, res) => {
    const id = req.params._id
    await productModal.findByIdAndDelete(id)
    try {
        res.redirect('/productPage')
    } catch (error) {
        console.log(error)
        res.status(500).send('error' , error)
    }
}
const callFetchAllProduct = async(req, res) => {
    const listProducts  =await productModal.find({})
    try {
        return res.json(listProducts)
    } catch (error) {  
        console.error('error:', err);
        res.status(500).send('Đã có lỗi xảy ra');
    }
}


module.exports = {callCreateProduct ,callUpdateProduct , callDeleteProduct , callFetchAllProduct} 