const mysql = require("../dbconnection.js");

const Tour = function (tour) {
  this.idTour = tour.idTour | 0;
  this.titleTour = tour.titleTour;
  this.price = tour.price;
  this.sale = tour.sale;
  this.departureDay = tour.departureDay ? tour.departureDay.slice(0, 10).replace(/-/g, "/") : "";
  this.describe = tour.describe;
  this.address = tour.address;
  this.vocationTime = tour.vocationTime;
  this.idAccount = tour.idAccount;
  this.tags = tour.tags;
  this.services = tour.services;
  this.views = tour.views;
  this.votes = tour.votes;
  this.reuse = tour.reuse;
  this.type = tour.type;
};

// --- ĐÃ SỬA: XÓA BỎ BIẾN DATABASE CỨNG ---

Tour.getAllTour = function (funcResult) {
  mysql.query(
    "SELECT * FROM tours WHERE statusAction <> 'deleted';",
    function (err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Tour.getAllTourForUser = function (idAccount, funcResult) {
  mysql.query(
    "SELECT * FROM tours where idAccount = ? AND statusAction <> 'deleted'; ",
    [idAccount],
    function (err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Tour.getAllTourSearch = function (searchs, funcResult) {
  if (searchs.conditional === "name") {
    mysql.query(
      `call spsearchEngineTourByName( '${searchs.keySearch}', '${searchs.dayStart}', '${searchs.dayEnd}', ${10000000000} ); `,
      function (err, res) {
        if (err) funcResult(err, null);
        else funcResult(null, res[0]);
      }
    );
  } else if (searchs.conditional === "landmark" || searchs.conditional === "address") {
    mysql.query(
      `call spsearchEngineTourByAddress( '${searchs.keySearch}', '${searchs.dayStart}', '${searchs.dayEnd}', ${10000000000} ); `,
      function (err, res) {
        if (err) funcResult(err, null);
        else funcResult(null, res[0]);
      }
    );
  } else {
    mysql.query(
      `call spsearchEngineTour( '${searchs.keySearch}', '${searchs.dayStart}', '${searchs.dayEnd}', ${10000000000} ); `,
      function (err, res) {
        if (err) funcResult(err, null);
        else funcResult(null, res[0]);
      }
    );
  }
};

Tour.createTour = function (newTour, funcResult) {
  // Gán lại context this để đảm bảo dữ liệu
  const data = {
      titleTour: newTour.titleTour,
      price: newTour.price,
      sale: newTour.sale,
      departureDay: newTour.departureDay,
      describe: newTour.describe,
      address: newTour.address,
      vocationTime: newTour.vocationTime,
      idAccount: newTour.idAccount,
      tags: newTour.tags,
      services: newTour.services,
      views: newTour.views,
      votes: newTour.votes,
      reuse: newTour.reuse,
      type: newTour.type
  };
  
  mysql.query(
    "INSERT INTO tours (`titleTour`, `price`, `sale`, `departureDay`, `describe`, `address`, `vocationTime`, `idAccount`, `tags`, `services`, `views`, `votes`, `reuse`, `type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [data.titleTour, data.price, data.sale, data.departureDay, data.describe, data.address, data.vocationTime, data.idAccount, data.tags, data.services, data.views, data.votes, data.reuse, data.type],
    function (err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Tour.getTourById = function (idTour, funcResult) {
  mysql.query(
    "SELECT * FROM tours WHERE idTour = ? AND statusAction <> 'deleted';",
    [idTour],
    function (err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Tour.getTourByIdWithIdAccount = function (idTour, idAccount, funcResult) {
  mysql.query(
    "SELECT * FROM tours WHERE idTour = ? AND idAccount = ? AND statusAction <> 'deleted' ;",
    [idTour, idAccount],
    function (err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Tour.updateById = function (updateTour, funcResult) {
  updateTour = { ...updateTour, statusAction: "edited" };
  mysql.query(
    "UPDATE tours SET ? WHERE (idTour = ?);",
    [updateTour, updateTour.idTour],
    function (err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Tour.remove = function (idTour, funcResult) {
  mysql.query(
    "UPDATE tours SET `statusAction` = 'deleted' WHERE idTour = ?",
    [idTour],
    function (err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Tour.createImageTour = function (idTour, name, funcResult) {
  var link = `/img/${name}`;
  var status = "done";
  mysql.query(
    "INSERT INTO images (link, status, name, idTour) VALUES (?, ?, ?, ?)",
    [link, status, name, idTour],
    function (err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

module.exports = Tour;