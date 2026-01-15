const database = require("../dbconnectMySql");

const Tag = function(tag) {
  this.idTag = tag.idTag | 0;
  this.name = tag.name;
};

// --- ĐÃ SỬA ---

Tag.getAllTag = function() {
  return new Promise(function(resolve, reject) {
    database.query("SELECT * FROM tags WHERE statusAction <> 'deleted';")
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Tag.getTagById = function(idTag) {
  return new Promise(function(resolve, reject) {
    database.query("SELECT * FROM tags where idTag = ? AND statusAction <> 'deleted';", [idTag])
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Tag.getAllTagSearch = function(searchs) {
  // Chuyển SP thành SQL thường
  return new Promise(function(resolve, reject) {
    database.query(`SELECT * FROM tags WHERE name LIKE '%${searchs.keySearch}%'`)
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Tag.createTag = function(newTag) {
  return new Promise(function(resolve, reject) {
    database.query("INSERT INTO tags (`name`) VALUES (?)", [newTag.name])
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Tag.updateById = function(updateTag) {
  updateTag = { ...updateTag, statusAction: "edited" };
  return new Promise(function(resolve, reject) {
    database.query("UPDATE tags SET ? WHERE (idTag = ?);", [updateTag, updateTag.idTag])
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Tag.remove = function(idTag) {
  return new Promise(function(resolve, reject) {
    database.query("UPDATE tags SET `statusAction` = 'deleted' WHERE idTag = ?", [idTag])
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

module.exports = Tag;