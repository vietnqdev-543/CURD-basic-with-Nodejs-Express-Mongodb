// const express = require('express')
// const app = express()
// const path = require('path')
// const cors = require('cors');
// var bodyParser = require('body-parser');
// require('dotenv').config()  
// const mongoose = require('mongoose')
// const router = require('./routes/web')
// app.use(express.json()); // Used to parse JSON bodies
// // app.use(express.urlencoded()); //Parse URL-encoded bodies
// app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//   origin: 'http://localhost:5173'
// }));
// app.use(express.json({ limit: '50mb' })); // Move this line to the to

// const port = process.env.PORT
// const url = process.env.MONGO_URI
// const hostname = 'http://localhost:'

// //config template ejs
// app.set('views' , path.join(__dirname , 'views') )
// app.set('view engine' , 'ejs')  

// //config static file
// app.use(express.static(path.join(__dirname , 'public')))


// //route

// app.use('/' ,router)


// //connect db
//   mongoose.connect(url)
//   .then(() => {
//      console.log('Connect DB successfully!')  
//   })
//   .catch((err) => {
//     console.log(err)
//   });

// app.listen(port, () => {
//   console.log(`Server is running in port :  ${hostname + port}`)  
// })

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./routes/web');

// Sửa đổi: Tăng giới hạn kích thước body JSON
app.use(express.json({ limit: '50mb' })); 

// Sửa đổi: Chỉ sử dụng một middleware parser phù hợp (JSON hoặc URL-encoded)
// app.use(express.urlencoded({ extended: true })); // Bỏ nếu không cần

app.use(cors({
  origin: 'http://localhost:5173'
}));

// ... phần còn lại của mã (kết nối mongoose, routes, v.v.)

// Kết nối database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connect DB successfully!');
  })
  .catch((err) => {
    console.log(err);
  });

// Cấu hình template EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Cấu hình static file
app.use(express.static(path.join(__dirname, 'public')));

// Thiết lập route
app.use('/', router);

// Chạy server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port: ${process.env.PORT || 3000}`);
});