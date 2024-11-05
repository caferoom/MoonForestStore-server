-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '微信昵称',
  `gender` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '0:未知 1:男 2:女',
  `birthday` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Unix时间戳',
  `register_time` int(10) unsigned NOT NULL COMMENT '注册时间(unix时间戳)',
  `last_login_time` int(10) unsigned NOT NULL COMMENT '上一次登录时间(unix时间戳)',
  `last_login_ip` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '上一次登录IP',
  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户手机号',
  `register_ip` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '注册时候的IP',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '微信头像',
  `weixin_openid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '微信openId',
  `weixin_unionid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '微信unionId',
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `province` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_disabled` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '1:账户禁用 0:账户正常',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5590 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1048, '微信用户1', 1, 0, 1582794169, 1681903302, "last_login_ip", null, 'register_ip', '/static/upload/avatar/25f45a40-9447-41bc-9d53-4c5fc17f3dff.jpeg', 'openId', 'unionId', null, null, null, 0);
COMMIT;