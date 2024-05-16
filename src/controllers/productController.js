const categoryModal = require('../models/categoryModal')
const productModal = require('../models/productModal')
const userModal = require('../models/userModel')

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
        slider : req.body.slider
    })
    newProduct.save()
    try {
        console.log('tạo product thành công')
        res.status(200).send('create product success')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error while creating a new Product')
    }
}

const callUpdateProduct = async(req, res) => {
    const  {_id ,name , brand , sex ,price ,waterproof ,size ,quantity ,sold , description , image , slider} = req.body
    try {
        const productUpdate = await productModal.findByIdAndUpdate(_id ,{ name : name , brand :  brand , price : price , sex : sex , waterproof : waterproof , size : size , image : image , quantity:quantity , sold : sold ,description : description , slider : slider})
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
const callFetchProductById = async (req, res) => {
    const id = req.params.id;
    const product = await productModal.findById(id)
    if(!product){
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
   try {
    res.status(200).json({
        message : 'ok' ,
        data : product ,
    });
   } catch (error) {
        res.status(500).send(error)
   }
  }

  const callHandleUpLoadFile = (req, res) => {
    const image = req.body
    try {
        res.status(200).json({
            message : 'upload file thành công' ,
            data : image
        })
    } catch (error) {
        
    }
  } 
  const callCreateComments = async (req, res) => {
    const { _id, customerId, customerName, customerAvatar, text, rate } = req.body;
    try {
        const createComment = await productModal.findByIdAndUpdate(_id, {
            $push: {
                comments: {
                    customerId: customerId,
                    customerName: customerName,
                    customerAvatar: customerAvatar,
                    text: text,
                    rate: rate
                }
            }
        });

        res.status(200).json({
            message: 'Create comment successfully',
            data: createComment
        });
    } catch (error) {
        res.status(500).send(error);
    }
};
const callGetCommentById  = async(req, res) => {
    const _id = req.params._id
    const listCommentById = await userModal.findById(_id)
    try {          
        res.status(200).json({
            message: 'fetch cmt by id succes' ,
            data : _id
        })
    } catch (error) {
        res.status(500).send(error)
    }
}


  
module.exports = {callCreateProduct ,callUpdateProduct , callFetchAllProduct , callDeleteProduct , callFetchProductById , callHandleUpLoadFile , callCreateComments , callGetCommentById} 