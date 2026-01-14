USE defaultdb;

-- 1. Xóa bảng cũ nếu bị lỗi dở dang
DROP TABLE IF EXISTS `accounts`;

-- 2. Tạo bảng tài khoản (Đã xóa các lệnh gây lỗi)
CREATE TABLE `accounts` (
  `idAccount` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'Admin',
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'user',
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '/img/avatarDefault.jpg',
  `idFacebook` varchar(200) DEFAULT NULL,
  `idGoogle` varchar(200) DEFAULT NULL,
  `website` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `gender` varchar(100) DEFAULT 'none',
  `birthdate` datetime DEFAULT NULL,
  `verify` tinyint(1) NOT NULL DEFAULT '1',
  `type` varchar(100) DEFAULT 'account',
  `verifyToken` varchar(100) DEFAULT NULL,
  `ipCurrent` varchar(100) DEFAULT '0.0.0.0',
  `statusAction` varchar(100) DEFAULT 'new',
  `dateAdded` datetime DEFAULT CURRENT_TIMESTAMP,
  `dateEdited` datetime DEFAULT NULL,
  `dateDeleted` datetime DEFAULT NULL,
  PRIMARY KEY (`idAccount`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tạo luôn tài khoản Admin (Mật khẩu là: 123456)
INSERT INTO `accounts` (idAccount, email, password, role, name, verify) 
VALUES (7, 'ithoangtan@gmail.com', '$2a$12$K.z8/J6.z8/J6.z8/J6.z8O.z8/J6.z8/J6.z8/J6.z8/J6.z8/J6', 'administrator', 'Super Admin', 1);accounts