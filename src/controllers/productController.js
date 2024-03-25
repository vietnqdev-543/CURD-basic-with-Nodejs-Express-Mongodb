const productModal = require('../models/productModal')

const callCreateProduct = (req,res) => {
    const newProduct = new productModal({
        name: req.body.name, 
        price: req.body.price,
        brand : req.body.brand ,
        image : req.body.image , 
        description : req.body.description ,
    })
    newProduct.save()
    try {
        console.log('tạo product thành công')
        res.redirect('/productPage')
        location.reload(true)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error while creating a new Product')
    }
}

const callUpdateProduct = (req, res) => {
    res.send('update')
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


module.exports = {callCreateProduct ,callUpdateProduct , callDeleteProduct} 