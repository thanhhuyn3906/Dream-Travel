const database = require("../dbconnectMySql");

const Config = function (config) {
  this.idConfig = config.idConfig | 0;
  this.configs = config.configs;
  this.infoType = config.infoType;
};

// --- ĐÃ SỬA ---

Config.getAllConfig = function () {
  return new Promise(function (resolve, reject) {
    database.query("SELECT * FROM configs WHERE statusAction <> 'deleted'; ")
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

Config.getConfigById = function (idConfig) {
  return new Promise(function (resolve, reject) {
    database.query("SELECT * FROM configs where idConfig = ? AND statusAction <> 'deleted'; ", [idConfig])
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};
Config.getConfigByInfoType = function (infoType) {
  return new Promise(function (resolve, reject) {
    database.query("SELECT * FROM configs where infoType = ? AND statusAction <> 'deleted'; ", [infoType])
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};
Config.getAllConfigSearch = function (searchs) {
  return new Promise(function (resolve, reject) {
    database.query(`SELECT * FROM configs WHERE configs LIKE '%${searchs.keySearch}%'`)
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

Config.createConfig = function (newConfig) {
  return new Promise(function (resolve, reject) {
    database.query("INSERT INTO configs (`infoType`, `configs`) VALUES (?, ?)", [newConfig.infoType, newConfig.configs])
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

Config.updateById = function (updateConfig) {
  updateConfig = { ...updateConfig, statusAction: "edited" };
  return new Promise(function (resolve, reject) {
    database.query("UPDATE configs SET ? WHERE (idConfig = ?);", [updateConfig, updateConfig.idConfig])
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

Config.remove = function (idConfig) {
  return new Promise(function (resolve, reject) {
    database.query("UPDATE configs SET `statusAction` = 'deleted' WHERE idConfig = ?", [idConfig])
      .then((rows) => resolve(rows)).catch((err) => reject(err));
  });
};

module.exports = Config;