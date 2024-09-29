
-- ----------------------------
-- Table structure for except_area
-- ----------------------------
DROP TABLE IF EXISTS `except_area`;
CREATE TABLE `except_area` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '这一组地域的别名',
  `area` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '本组区域涵盖的地区，存储格式"1,2,43,54", 每个数字与region表中的id对应。(目前仅存储省份)'
  `is_delete` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of except_area
-- ----------------------------
BEGIN;
INSERT INTO `except_area` VALUES (5, '偏远地区', '6,8,9,21,22,27,31,32,33,34,35,36', 0);
INSERT INTO `except_area` VALUES (6, '稍偏远地区', '2,3,4,5,6,7', 0);
COMMIT;
