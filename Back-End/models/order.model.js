const mysql = require("../dbconnection.js");

const Order = function(order) {
  this.idOrder = order.idOrder || 0;
  this.PIN = order.PIN || 0;
  this.status = order.status || "verify";
  this.totalPrice = order.totalPrice || 0;
  this.numberPeople = order.numberPeople || 1;
  this.numberChildren = order.numberChildren || 0;
  this.address = order.address || " ";
  this.phone = order.phone || " ";
  this.email = order.email || " ";
  this.notes = order.notes || " ";
  this.idAccount = order.idAccount || 8;
  this.buyer = order.buyer || " ";
  this.idTour = order.idTour || " ";
};

// --- ĐÃ SỬA SQL ĐỂ CHẠY TRÊN RENDER ---

Order.getAllOrder = function(funcResult) {
  mysql.query(
    "SELECT * FROM orders WHERE statusAction <> 'deleted';",
    function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Order.getAllOrderForUser = function(idAccount, funcResult) {
  mysql.query(
    "SELECT * FROM orders where idAccount = ? AND statusAction <> 'deleted';",
    [idAccount],
    function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Order.createOrder = function(newOrder, funcResult) {
  mysql.query(
    "INSERT INTO orders (`PIN`, `status`, `totalPrice`, `numberPeople`, `numberChildren`, `address`, `phone`,`email`,`notes`, `idAccount`, `buyer`, `idTour` ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [newOrder.PIN, newOrder.status, newOrder.totalPrice, newOrder.numberPeople, newOrder.numberChildren, newOrder.address, newOrder.phone, newOrder.email, newOrder.notes, newOrder.idAccount, newOrder.buyer, newOrder.idTour],
    function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Order.getOrderById = function(idOrder, funcResult) {
  mysql.query(
    "SELECT * FROM orders WHERE idOrder = ? AND statusAction <> 'deleted';",
    [idOrder],
    function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Order.getOrderByEmail = function(email, funcResult) {
  mysql.query(
    "SELECT * FROM orders inner join tours on tours.idTour = orders.idTour WHERE email = ? AND orders.statusAction <> 'deleted' order by orders.dateAdded desc limit 0,5;",
    [email],
    function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Order.getOrderByIdWithIdAccount = function(idOrder, idAccount, funcResult) {
  mysql.query(
    "SELECT * FROM orders WHERE idOrder = ? AND idAccount = ? AND statusAction <> 'deleted';",
    [idOrder, idAccount],
    function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Order.updateById = function(updateOrder, funcResult) {
  updateOrder = { ...updateOrder, statusAction: "edited" };
  mysql.query(
    "UPDATE orders SET ? WHERE (idOrder = ?);",
    [updateOrder, updateOrder.idOrder],
    function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Order.updateByPIN = function(updateOrder, funcResult) {
  updateOrder = { ...updateOrder, statusAction: "edited" };
  mysql.query(
    "UPDATE orders SET ? WHERE (PIN = ?);",
    [updateOrder, updateOrder.PIN],
    function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

Order.remove = function(idOrder, funcResult) {
  mysql.query(
    "UPDATE orders SET `statusAction` = 'deleted' WHERE idOrder = ?",
    [idOrder],
    function(err, res) {
      if (err) funcResult(err, null);
      else funcResult(null, res);
    }
  );
};

module.exports = Order;