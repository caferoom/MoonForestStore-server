-- ----------------------------
-- Table structure for hiolabs_admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录用户名',
  `password` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录密码（加密后）',
  `password_salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '加密用salt',
  `last_login_ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '上次登录IP',
  `last_login_time` bigint(14) NULL DEFAULT NULL COMMENT '时间戳',
  `is_delete` tinyint(1) DEFAULT 0 COMMENT '是否删除(1: 使用中、2: 已删除)',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY unique_username (username)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of admin
-- ----------------------------
BEGIN;
INSERT INTO `admin` VALUES (1, 'admin', '34dd4d728ddc30c107b974f6213efb41', 'HIOLABS', '::1', 1681967830, 0);
INSERT INTO `admin` VALUES (2, 'admin4', '34dd4d728ddc30c107b974f6213efb41', 'HIOLABS', '::1', NULL, 0);

COMMIT;
