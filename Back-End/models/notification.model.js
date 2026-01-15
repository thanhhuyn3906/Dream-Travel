const database = require("../dbconnectMySql");

const Notification = function (notification) {
  this.idNotification = notification.idNotification | 0;
  this.title = notification.title;
  this.contentNotification = notification.contentNotification;
  this.status = notification.status;
  this.type = notification.type;
  this.dateTime = notification.dateTime ? notification.dateTime.slice(0, 10).replace(/-/g, "/") : undefined;
  this.idAccount = notification.idAccount;
};

// --- ĐÃ SỬA: Thay thế toàn bộ SP bằng SQL ---

Notification.getPaginationNotification = function (limit, offset) {
  return new Promise(function (resolve, reject) {
    // Sửa LIMIT offset, limit
    database.query(`SELECT * FROM notifications WHERE statusAction <> 'deleted' ORDER BY idNotification DESC LIMIT ${offset}, ${limit}`)
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

Notification.getLatestId = function () {
  return new Promise(function (resolve, reject) {
    database.query("SELECT idNotification FROM notifications order by idNotification desc limit 1;")
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

Notification.getAllNotification = function () {
  return new Promise(function (resolve, reject) {
    database.query("SELECT * FROM notifications WHERE statusAction <> 'deleted';")
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

Notification.getAllNotificationSearch = function (searchs) {
  let query = "";
  if (searchs.conditional === "title") {
      query = `SELECT * FROM notifications WHERE title LIKE '%${searchs.keySearch}%'`;
  } else if (searchs.conditional === "content") {
      query = `SELECT * FROM notifications WHERE contentNotification LIKE '%${searchs.keySearch}%'`;
  } else {
      query = `SELECT * FROM notifications WHERE title LIKE '%${searchs.keySearch}%' OR dateTime LIKE '%${searchs.dayTime}%'`;
  }
  return new Promise(function (resolve, reject) {
    database.query(query).then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

Notification.createNotification = function (newNotification) {
  return new Promise(function (resolve, reject) {
    database.query(
        "INSERT INTO notifications (`title`, `contentNotification`, `status`, `type`, `dateTime`, `idAccount`) VALUES (?, ?, ?, ?, ?, ?)",
        [newNotification.title, newNotification.contentNotification, newNotification.status, newNotification.type, newNotification.dateTime, newNotification.idAccount]
      ).then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

Notification.getNotificationById = function (idNotification) {
  return new Promise(function (resolve, reject) {
    database.query("SELECT * FROM notifications WHERE idNotification = ? AND statusAction <> 'deleted';", [idNotification])
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

Notification.updateById = function (updateNotification) {
  updateNotification = { ...updateNotification, statusAction: "edited" };
  return new Promise(function (resolve, reject) {
    database.query("UPDATE notifications SET ? WHERE (idNotification = ?);", [updateNotification, updateNotification.idNotification])
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

Notification.remove = function (idNotification) {
  return new Promise(function (resolve, reject) {
    database.query("UPDATE notifications SET `statusAction` = 'deleted' WHERE idNotification = ?", [idNotification])
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

module.exports = Notification;