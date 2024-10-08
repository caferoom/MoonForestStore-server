
-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '收件人姓名',
  `user_id` mediumint(8) unsigned NOT NULL COMMENT '关联用户id,关联user列表Id',
  `province_id` smallint(6) NOT NULL COMMENT '收件人省区id,关联region列表Id',
  `city_id` smallint(6) NOT NULL COMMENT '收件人城市id,关联region列表Id',
  `district_id` smallint(6) NOT NULL COMMENT '收件人区域id,关联region列表Id',
  `address` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `mobile` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `is_default` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_delete` tinyint(1) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2183 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of address
-- ----------------------------
BEGIN;
INSERT INTO `address` VALUES (271, '收件人1号', 1048, 2, 37, 403, '红花小区', '13588454545', 1, 0);
INSERT INTO `address` VALUES (272, '收件人2号', 1048, 2, 37, 403, '才华小区', '13588454543', 0, 0);
INSERT INTO `address` VALUES (273, '收件人3号', 1048, 3, 37, 403, '笨蛋小区', '13588454545', 0, 0);
INSERT INTO `address` VALUES (274, '收件人4号', 1048, 2, 37, 403, '天才40哈奥', '13588454545', 0, 0);
INSERT INTO `address` VALUES (275, '收件人5号', 1048, 2, 37, 403, '牛皮路208', '13588454545', 0, 0);
INSERT INTO `address` VALUES (276, '收件人6号', 1048, 2, 37, 403, '哈哈街49号', '13588454545', 0, 0);
INSERT INTO `address` VALUES (277, '收件人7号', 1048, 2, 37, 403, '天使路209', '13588454545', 0, 0);

COMMIT;
