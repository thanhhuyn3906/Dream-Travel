const database = require("../dbconnectMySql");

const Favorite = function(favorite) {
  this.idFavorite = favorite.idFavorite || null;
  this.idAccount = favorite.idAccount || 8;
  this.idTour = favorite.idTour;
};

// --- ĐÃ SỬA ---

Favorite.getAll = function() {
  return new Promise(function(resolve, reject) {
    database.query("SELECT * FROM favorites WHERE statusAction <> 'deleted';")
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Favorite.create = function(newFavorite) {
  return new Promise(function(resolve, reject) {
    database.query("INSERT INTO favorites (`idAccount`, `idTour` ) VALUES (?, ?)", [newFavorite.idAccount, newFavorite.idTour])
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Favorite.getById = function(idFavorite) {
  return new Promise(function(resolve, reject) {
    database.query("SELECT * FROM favorites WHERE idFavorite= ? AND statusAction <> 'deleted';", [idFavorite])
      .then(rows => resolve(rows[0])).catch(err => reject(err));
  });
};

Favorite.getByEmail = function(email) {
  return new Promise(function(resolve, reject) {
    // Đã xóa databaseProduction
    const query = `
      SELECT favorites.idTour, accounts.email, accounts.idAccount, tours.titleTour, tours.price, tours.sale, tours.departureAddress,
      tours.departureDay, tours.describe, tours.address, tours.vocationTime, tours.type
      FROM favorites
      inner join accounts on accounts.idAccount = favorites.idAccount
      inner join tours on tours.idTour = favorites.idTour where email= ?
    `;
    database.query(query, [email])
      .then(rows => resolve(rows[0])).catch(err => reject(err));
  });
};

Favorite.updateById = function(updateFavorite) {
  updateFavorite = { ...updateFavorite, statusAction: "edited" };
  return new Promise(function(resolve, reject) {
    database.query("UPDATE favorites SET ? WHERE (idFavorite= ?);", [updateFavorite, updateFavorite.idFavorite])
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

Favorite.remove = function(idFavorite) {
  return new Promise(function(resolve, reject) {
    database.query("UPDATE favorites SET `statusAction` = 'deleted' WHERE (idFavorite= ?);", [idFavorite])
      .then(rows => resolve(rows)).catch(err => reject(err));
  });
};

module.exports = Favorite;