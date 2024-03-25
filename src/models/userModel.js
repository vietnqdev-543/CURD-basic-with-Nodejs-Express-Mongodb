const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password : String ,
    phone : String ,
    city: String

  },
  {timestamps :true}
);

const userModal = mongoose.model('User' , userSchema)
module.exports =  userModal
  