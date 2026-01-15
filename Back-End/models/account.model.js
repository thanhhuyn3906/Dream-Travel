const database = require("../dbconnectMySql");

const Account = function(account) {
  this.idAccount = account.idAccount || null;
  this.idFacebook = account.idFacebook || null;
  this.idGoogle = account.idGoogle || null;
  this.name = account.name;
  this.username = account.username || account.email;
  this.email = account.email;
  this.phone = account.phone;
  this.avatar = account.avatar;
  this.role = account.role || "user"; 
  this.password = account.password;
  this.verifyToken = account.verifyToken;
  this.address = account.address || " ";
  this.website = account.website || "abc.xyz";
  this.birthdate = account.birthdate || " ";
};

// --- ĐÃ SỬA: XÓA BỎ VIỆC GHÉP TÊN DATABASE CỨNG ---
// Chỉ cần gọi tên bảng là đủ vì kết nối đã chọn đúng DB rồi

Account.getAll = function() {
  return new Promise(function(resolve, reject) {
    database
      .query("SELECT * FROM accounts WHERE statusAction <> 'deleted';")
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Account.create = function(newAccount) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "INSERT INTO accounts (`name`, `username`, `email`, `phone`, `role`, `password`, `verify` , `verifyToken`,`avatar`,`idFacebook`,`idGoogle` ) VALUES ('" +
          newAccount.name + "', '" + newAccount.username + "', '" + newAccount.email + "', '" +
          newAccount.phone + "', '" + newAccount.role + "', '" + newAccount.password + "', '" +
          newAccount.verify + "', '" + newAccount.verifyToken + "', '" + newAccount.avatar + "', '" +
          newAccount.idFacebook + "', '" + newAccount.idGoogle + "') "
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Account.getById = function(idAccount) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "SELECT * FROM accounts WHERE idAccount= ? AND statusAction <> 'deleted';",
        [idAccount]
      )
      .then(rows => resolve(rows[0]))
      .catch(err => reject(err));
  });
};

Account.getByEmailAndRole = function(email, role) {
  return new Promise(function(resolve, reject) {
    // Sửa lại query đơn giản, không ghép chuỗi database
    database
      .query(
        "SELECT * FROM accounts WHERE email= ? AND role= ? AND statusAction <> 'deleted';",
        [email, role]
      )
      .then(rows => resolve(rows[0]))
      .catch(err => reject(err));
  });
};

Account.getByIdGoogle = function(idGoogle) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "SELECT * FROM accounts WHERE idGoogle= ? AND statusAction <> 'deleted' ;",
        [idGoogle]
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Account.getByIdFacebook = function(idFacebook) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "SELECT * FROM accounts WHERE idFacebook= ?  AND statusAction <> 'deleted';",
        [idFacebook]
      )
      .then(rows => resolve(rows[0]))
      .catch(err => reject(err));
  });
};

Account.updateById = function(updateAccount) {
  updateAccount = { ...updateAccount, statusAction: "edited" };
  return new Promise(function(resolve, reject) {
    database
      .query(
        "UPDATE accounts SET ? WHERE (idAccount= ?);",
        [updateAccount, updateAccount.idAccount]
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Account.remove = function(idAccount) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "UPDATE accounts SET `statusAction` = 'deleted' WHERE (idAccount= ?);",
        [idAccount]
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

module.exports = Account;