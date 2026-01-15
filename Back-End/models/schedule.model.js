const mysql = require("../dbconnection.js");

const Schedule = function(schedule) {
  this.data = schedule.data;
  this.idTour = schedule.idTour;
  this.policy = schedule.policy;
  this.detailPrice = schedule.detailPrice;
  this.notes = schedule.notes;
  this.contacts = schedule.contacts;
};

// --- ĐÃ SỬA: XÓA TÊN DATABASE CỨNG ---

Schedule.getAllSchedule = function(funcResult) {
  mysql.query("SELECT * FROM schedules WHERE statusAction <> 'deleted';", function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
  });
};

Schedule.createSchedule = function(newSchedule, funcResult) {
  mysql.query(
    "INSERT INTO schedules (`data`, `idTour`, `policy`, `detailPrice`, `notes`, `contacts`) VALUES (?, ?, ?, ?, ?, ?)",
    [newSchedule.data, newSchedule.idTour, newSchedule.policy, newSchedule.detailPrice, newSchedule.notes, newSchedule.contacts],
    function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Schedule.getScheduleById = function(idSchedule, funcResult) {
  mysql.query("SELECT * FROM schedules WHERE idSchedule = ? AND statusAction <> 'deleted';", [idSchedule], function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
  });
};

Schedule.getScheduleByIdTour = function(idTour, funcResult) {
  mysql.query("SELECT * FROM schedules WHERE idTour = ? AND statusAction <> 'deleted';", [idTour], function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
  });
};

Schedule.updateById = function(updateSchedule, funcResult) {
  updateSchedule = { ...updateSchedule, statusAction: "edited" };
  // Sửa lỗi logic: Dùng idSchedule hoặc idTour tùy context, ở đây giữ nguyên logic cũ nhưng sửa query an toàn
  mysql.query("UPDATE schedules SET ? WHERE idTour = ?;", [updateSchedule, updateSchedule.idTour], function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
  });
};

Schedule.remove = function(idSchedule, funcResult) {
  mysql.query("UPDATE schedules SET `statusAction` = 'deleted' WHERE idSchedule = ?", [idSchedule], function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
  });
};

module.exports = Schedule;