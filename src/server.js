

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
app.listen(process.env.PORT || 3500, () => {
  console.log(`Server is running on port: ${process.env.PORT || 3500}`);
});