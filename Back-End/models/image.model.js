const mysql = require("../dbconnection.js");
const fs = require("fs");

const Image = function (image) {
  this.idImage = image.idImage | 0;
  this.link = image.link;
  this.dateAdded = image.dateAdded ? image.dateAdded.slice(0, 10).replace(/-/g, "/") : "";
  this.status = image.status;
  this.name = image.name;
  this.idTour = image.idTour;
};

// --- ĐÃ SỬA: XÓA TIỀN TỐ DATABASE ---

Image.getImageById = function (idImage, fncResult) {
  mysql.query(
    "SELECT * FROM images WHERE idImage = ? AND statusAction <> 'deleted';",
    [idImage],
    function (err, res) {
      if (err) fncResult(err, null);
      else fncResult(null, res);
    }
  );
};

Image.getAllImageTour = function (fncResult) {
  mysql.query(
    "SELECT * FROM images WHERE statusAction <> 'deleted' AND idTour > 0;",
    function (err, res) {
      if (err) fncResult(err, null);
      else fncResult(null, res);
    }
  );
};

Image.getAllImagePost = function (fncResult) {
  mysql.query(
    "SELECT * FROM images WHERE statusAction <> 'deleted' AND idPost > 0;",
    function (err, res) {
      if (err) fncResult(err, null);
      else fncResult(null, res);
    }
  );
};

Image.getAllImageConfig = function (fncResult) {
  mysql.query(
    "SELECT * FROM images WHERE statusAction <> 'deleted' AND idConfig > 0;",
    function (err, res) {
      if (err) fncResult(err, null);
      else fncResult(null, res);
    }
  );
};

Image.getAllImageTourById = function (idTour, fncResult) {
  mysql.query(
    "SELECT * FROM images WHERE idTour = ? AND statusAction <> 'deleted';",
    [idTour],
    function (err, res) {
      if (err) fncResult(err, null);
      else fncResult(null, res);
    }
  );
};

Image.remove = function (idImage, name, fncResult) {
  mysql.query(
    "UPDATE images SET `statusAction` = 'deleted' WHERE idImage = ?",
    [idImage],
    function (err, res) {
      if (err) {
        fncResult(err, null);
      } else {
        // Code cũ xóa file trên server, với Render thì không lưu file được lâu dài nhưng cứ để tạm
        let path = `./public/img/${name}`;
        path = path.replace(" ", "");
        fs.unlink(path, (err) => {
          if (err) console.log(err);
        });
        fncResult(null, res);
      }
    }
  );
};

Image.createImageTour = function (idTour, name, fncResult) {
  let url = `/img/${name}`;
  let status = "done";
  mysql.query(
    "INSERT INTO images (url, status, name, idTour) VALUES (?, ?, ?, ?)",
    [url, status, name, idTour],
    function (err, res) {
      if (err) fncResult(err, null);
      else fncResult(null, res);
    }
  );
};

Image.createImagePost = function (idPost, name, fncResult) {
  let url = `/img/${name}`;
  let status = "done";
  mysql.query(
    "INSERT INTO images (url, status, name, idPost) VALUES (?, ?, ?, ?)",
    [url, status, name, idPost],
    function (err, res) {
      if (err) fncResult(err, null);
      else fncResult(null, res);
    }
  );
};

Image.createImageConfig = function (idConfig, name, fncResult) {
  let url = `/img/${name}`;
  mysql.query(
    "UPDATE configs SET ? WHERE (idConfig = ?);",
    [{ image: url }, idConfig],
    function (err, res) {
      if (err) fncResult(err, null);
      else fncResult(null, res);
    }
  );
};

Image.updateAvatar = function (idAccount, name, fncResult) {
  let url = `/img/${name}`;
  mysql.query(
    "UPDATE accounts SET ? WHERE (idAccount = ?);",
    [{ avatar: url }, idAccount],
    function (err, res) {
      if (err) fncResult(err, null);
      else fncResult(null, res);
    }
  );
};

module.exports = Image;