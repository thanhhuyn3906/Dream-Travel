const database = require("../dbconnectMySql");

const Post = function (post) {
  this.idPost = post.idPost | 0;
  this.idAccount = post.idAccount;
  this.contentPost = post.contentPost;
  this.status = post.status;
  this.vote = post.vote;
  this.titlePost = post.titlePost;
  this.describe = post.describe;
  this.type = post.type;
  this.tags = post.tags;
  this.views = post.views;
};

// --- ĐÃ SỬA: XÓA TÊN DATABASE CỨNG ---

Post.getAllPost = function () {
  return new Promise(function (resolve, reject) {
    database
      .query("SELECT * FROM posts WHERE statusAction <> 'deleted';")
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
};

Post.getAllPostSearch = function (searchs) {
  // Thay thế Stored Procedure bằng SQL thường để tìm kiếm
  let query = "";
  if (searchs.conditional === "content") {
     query = `SELECT * FROM posts WHERE contentPost LIKE '%${searchs.keySearch}%' AND statusAction <> 'deleted'`;
  } else {
     query = `SELECT * FROM posts WHERE titlePost LIKE '%${searchs.keySearch}%' AND statusAction <> 'deleted'`;
  }
  return new Promise(function (resolve, reject) {
    database
      .query(query)
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
};

Post.createPost = function (newPost) {
  return new Promise(function (resolve, reject) {
    database
      .query(
        "INSERT INTO posts (`idAccount`, `contentPost`, `status`, `vote`, `titlePost`, `describe`, `type`, `tags`, `views`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [newPost.idAccount, newPost.contentPost, newPost.status, newPost.vote, newPost.titlePost, newPost.describe, newPost.type, newPost.tags, newPost.views]
      )
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
};

Post.getPostById = function (idPost) {
  return new Promise(function (resolve, reject) {
    database
      .query("SELECT * FROM posts WHERE idPost = ? AND statusAction <> 'deleted';", [idPost])
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
};

Post.updateById = function (updatePost) {
  updatePost = { ...updatePost, statusAction: "edited" };
  return new Promise(function (resolve, reject) {
    database
      .query("UPDATE posts SET ? WHERE (idPost = ?);", [updatePost, updatePost.idPost])
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
};

Post.remove = function (idPost) {
  return new Promise(function (resolve, reject) {
    database
      .query("UPDATE posts SET `statusAction` = 'deleted' WHERE idPost = ?", [idPost])
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
};

module.exports = Post;