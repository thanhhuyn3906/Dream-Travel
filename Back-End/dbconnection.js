// Đổi từ mysql -> mysql2
var mysql = require("mysql2"); 

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "defaultdb",
  port: process.env.DB_PORT || 3306,
  multipleStatements: true,
  // Thêm cấu hình SSL để tương thích với Aiven
  ssl: {
    rejectUnauthorized: false
  }
};

const connection = mysql.createConnection(config);

connection.connect(function(err) {
  if (err) {
    console.error('❌ [dbconnection] Lỗi kết nối Database: ' + err.stack);
    return;
  }
  console.log('✅ [dbconnection] Đã kết nối Database thành công (Thread ID: ' + connection.threadId + ')');
});

module.exports = connection;