const database = require("../dbconnectMySql");

const NoticeTo = function (noticeTo) {
  this.idNoticeTo = noticeTo.idNoticeTo | 0;
  this.idNotification = noticeTo.idNotification;
  this.idAccount = noticeTo.idAccount;
  this.statusAction = noticeTo.statusAction;
};

// --- ĐÃ SỬA ---

NoticeTo.listNoticeTos = function (idAccount) {
  return new Promise(function (resolve, reject) {
    database.query("SELECT * FROM noticeto WHERE idAccount = ?", [idAccount])
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

NoticeTo.createNoticeTo = function (newNoticeTo) {
  return new Promise(function (resolve, reject) {
    database.query("INSERT INTO noticeto (`idNotification`, `idAccount`) VALUES (?, ?)", [newNoticeTo.idNotification, newNoticeTo.idAccount])
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

NoticeTo.updateById = function (updateNoticeTo) {
  updateNoticeTo = { ...updateNoticeTo, statusAction: "edited" };
  return new Promise(function (resolve, reject) {
    database.query("UPDATE noticeto SET ? WHERE (idNoticeTo = ?);", [updateNoticeTo, updateNoticeTo.idNoticeTo])
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

NoticeTo.remove = function (idNoticeTo) {
  return new Promise(function (resolve, reject) {
    database.query("UPDATE noticeto SET `statusAction` = 'deleted' WHERE idNoticeTo = ?", [idNoticeTo])
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

module.exports = NoticeTo;