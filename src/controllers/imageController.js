const imageModel = require('../models/imageModel')

const callUploadImage = async(req, res)=> {
    const {base64} = req.body 
    try {
       const newImage =   imageModel.create({image: base64})
        res.status(200).json({
            status : 'upload image succesfully' ,
            data :  newImage
        })
    } catch (error) {
        res.send(error)
    }
}
const callGetImage = async(req, res) => {
    try {
        const listImage = await imageModel.find({})
        res.send(listImage)
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {callUploadImage , callGetImage}