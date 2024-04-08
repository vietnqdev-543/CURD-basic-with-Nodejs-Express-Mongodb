const productModal = require('../models/productModal')

const callCreateProduct = (req,res) => {
    const newProduct = new productModal({
        name: req.body.name, 
        price: req.body.price,
        brand : req.body.brand ,
        sex : req.body.sex ,
        waterproof : req.body.waterproof ,
        quantity : req.body.quantity ,
        sold : req.body.sold ,
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
    const  {_id ,name , brand , sex ,price ,waterproof ,size ,quantity ,sold , description , image} = req.body
    try {
        const productUpdate = await productModal.findByIdAndUpdate(_id ,{ name : name , brand :  brand , price : price , sex : sex , waterproof : waterproof , size : size , image : image , quantity:quantity , sold : sold ,description : description })
        res.status(200).json({
            status : 'UpdateSuccesFully', 
            userUpdate : productUpdate
        })
    } catch (error) {
        res.status(500).send(error)
    }
  
}

const callDeleteProduct = async (req, res) => {
    const { _id } = req.params;
    await productModal.findByIdAndDelete(_id);
    try {
        res.status(200).json({
            status: 'Delete successfully : ',
            _id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('error', error);
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



module.exports = {callCreateProduct ,callUpdateProduct , callFetchAllProduct , callDeleteProduct} 