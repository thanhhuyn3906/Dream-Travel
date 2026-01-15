const database = require("../dbconnectMySql");

const Service = function(service) {
  this.idServices = service.idServices | 0;
  this.name = service.name;
};

// --- ĐÃ SỬA ---

Service.getAllService = function() {
  return new Promise(function(resolve, reject) {
    database.query("SELECT * FROM services WHERE statusAction <> 'deleted'; ")
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Service.getServiceById = function(idServices) {
  return new Promise(function(resolve, reject) {
    database.query("SELECT * FROM services where idServices = ? AND statusAction <> 'deleted'; ", [idServices])
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Service.getAllServiceSearch = function(searchs) {
  return new Promise(function(resolve, reject) {
    // Thay thế call spSearchEngineService
    database.query(`SELECT * FROM services WHERE name LIKE '%${searchs.keySearch}%'`)
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Service.createService = function(newService) {
  return new Promise(function(resolve, reject) {
    database.query("INSERT INTO services (`name`) VALUES (?)", [newService.name])
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Service.updateById = function(updateService) {
  updateService = { ...updateService, statusAction: "edited" };
  return new Promise(function(resolve, reject) {
    database.query("UPDATE services SET ? WHERE (idServices = ?);", [updateService, updateService.idServices])
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Service.remove = function(idServices) {
  return new Promise(function(resolve, reject) {
    database.query("UPDATE services SET `statusAction` = 'deleted' WHERE idServices = ?", [idServices])
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

module.exports = Service;