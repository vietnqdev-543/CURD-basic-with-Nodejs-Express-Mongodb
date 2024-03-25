const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const mongoose = require('mongoose')
const router = require('./routes/web')
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

const port = process.env.PORT
const url = process.env.MONGO_URI
const hostname = 'http://localhost:'

//config template ejs
app.set('views' , path.join(__dirname , 'views') )
app.set('view engine' , 'ejs')  

//config static file
app.use(express.static(path.join(__dirname , 'public')))

//route

app.use('/' ,router)


//connect db
  mongoose.connect(url)
  .then(() => {
     console.log('Connect DB successfully!')  
  })
  .catch((err) => {
    console.log(err)
  });

app.listen(port, () => {
  console.log(`Server is running in port :  ${hostname + port}`)
})