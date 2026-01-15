// Đổi từ mysql -> mysql2
const mysql = require("mysql2");

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
    this.connection.connect((err) => {
        if (err) {
            console.error("❌ [dbconnectMySql] Lỗi kết nối: ", err);
        } else {
            console.log("✅ [dbconnectMySql] Kết nối thành công!");
        }
    });
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "defaultdb",
  port: process.env.DB_PORT || 3306,
  // Thêm cấu hình SSL
  ssl: {
    rejectUnauthorized: false
  }
};

const database = new Database(config);

module.exports = database;