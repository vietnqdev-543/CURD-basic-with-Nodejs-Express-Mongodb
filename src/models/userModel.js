const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email :{type : String , require : true} ,
    name: {type : String , require : true} ,
    password : {type :String , require : true},
    isAdmin : {type : Boolean , require: true} ,
    avatar : {type : String , require: true} ,
    phone : {type : String , require : true} ,
    adress :{type : String} ,
  },
  {timestamps :true}
);

const userModal = mongoose.model('User' , userSchema)
module.exports =  userModal
  