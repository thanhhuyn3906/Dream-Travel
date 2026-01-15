var mysql = require("mysql");

// Cấu hình kết nối thông minh: Tự động lấy từ Render (biến môi trường) hoặc dùng Localhost nếu chạy ở máy
const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456", // Pass mặc định khi test local
  database: process.env.DB_NAME || "defaultdb",  // Tên DB chuẩn
  port: process.env.DB_PORT || 3306,
  multipleStatements: true // Cho phép chạy nhiều câu lệnh SQL cùng lúc
};

const connection = mysql.createConnection(config);

// Log ra màn hình để biết có kết nối được không
connection.connect(function(err) {
  if (err) {
    console.error('❌ [dbconnection] Lỗi kết nối Database: ' + err.stack);
    return;
  }
  console.log('✅ [dbconnection] Đã kết nối Database thành công (Thread ID: ' + connection.threadId + ')');
});

module.exports = connection;