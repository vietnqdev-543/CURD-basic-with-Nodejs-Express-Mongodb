const categoryModal = require('../models/categoryModal')
const callCreateCategory = (req, res) => {
    const newCategory =  new categoryModal({
        brand : req.body.brand , 
        country : req.body.country
    })
     newCategory.save()
    try {
        res.status(200).json({
            status : 'Create category succesfully' ,
            data : newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
        
    }   
}
const callFetchAllCategory = async(req, res) => {
    const listCategory = await categoryModal.find({})
    try {
        res.status(200).json({
            succes : true ,
            message : 'Fetch list category successfully' ,
            data : listCategory
        })
    } catch (error) {
        succes : false ,
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = {callCreateCategory , callFetchAllCategory}