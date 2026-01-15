const database = require("../dbconnectMySql");

const Timeline = function(timeline) {
  this.idTimelines = timeline.idTimelines | 0;
  this.idTour = timeline.idTour;
  this.title = timeline.title;
  this.description = timeline.description;
  this.date = timeline.date ? timeline.date.slice(0, 10).replace(/-/g, "/") : "";
};

// --- ĐÃ SỬA: Dùng SQL thuần, bỏ SP, bỏ tên DB cứng ---

Timeline.getAllTimeline = function() {
  return new Promise(function(resolve, reject) {
    database.query("SELECT * FROM timelines WHERE statusAction <> 'deleted'; ")
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Timeline.getTimelineById = function(idTimelines) {
  return new Promise(function(resolve, reject) {
    database.query("SELECT * FROM timelines where idTimelines = ? AND statusAction <> 'deleted'; ", [idTimelines])
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Timeline.getTimelineByIdTour = function(idTour) {
  return new Promise(function(resolve, reject) {
    // Thay thế call spGetTimelineByIdTour bằng SQL
    database.query("SELECT * FROM timelines WHERE idTour = ? AND statusAction <> 'deleted'", [idTour])
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Timeline.getAllTimelineSearch = function(searchs) {
  return new Promise(function(resolve, reject) {
    // Thay thế call spSearchEngineTimeline
    const query = `SELECT * FROM timelines WHERE title LIKE '%${searchs.keySearch}%' OR date LIKE '%${searchs.date}%'`;
    database.query(query).then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Timeline.createTimeline = function(newTimeline) {
  return new Promise(function(resolve, reject) {
    database.query(
        "INSERT INTO timelines (`idTour`, `title`, `description`, `date`) VALUES (?, ?, ?, ?)",
        [newTimeline.idTour, newTimeline.title, newTimeline.description, newTimeline.date]
      ).then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Timeline.updateById = function(updateTimeline) {
  updateTimeline = { ...updateTimeline, statusAction: "edited" };
  return new Promise(function(resolve, reject) {
    database.query("UPDATE timelines SET ? WHERE (idTimelines = ?);", [updateTimeline, updateTimeline.idTimelines])
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Timeline.remove = function(idTimelines) {
  return new Promise(function(resolve, reject) {
    database.query("UPDATE timelines SET `statusAction` = 'deleted' WHERE idTimelines = ?", [idTimelines])
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

module.exports = Timeline;