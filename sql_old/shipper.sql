
-- ----------------------------
-- Table structure for shipper
-- ----------------------------
DROP TABLE IF EXISTS `shipper`;
CREATE TABLE `shipper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '快递公司名称',
  `code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '快递公司代码',
  `sort_order` int(11) NOT NULL DEFAULT '10' COMMENT '排序',
  `MonthCode` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CustomerName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `shipper_id_uindex` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='快递公司';

-- ----------------------------
-- Records of shipper
-- ----------------------------
BEGIN;
INSERT INTO `shipper` VALUES (1, '顺丰速运', 'SF', 1, '5800278123', NULL, 1);
INSERT INTO `shipper` VALUES (2, '百世快递', 'HTKY', 2, NULL, NULL, 0);
INSERT INTO `shipper` VALUES (3, '中通快递', 'ZTO', 3, NULL, NULL, 0);
INSERT INTO `shipper` VALUES (4, '申通快递', 'STO', 4, NULL, NULL, 0);
INSERT INTO `shipper` VALUES (5, '圆通速递', 'YTO', 5, NULL, NULL, 1);
INSERT INTO `shipper` VALUES (6, '韵达速递', 'YD', 6, NULL, NULL, 0);
INSERT INTO `shipper` VALUES (7, '邮政快递包裹', 'YZPY', 7, NULL, NULL, 0);
INSERT INTO `shipper` VALUES (8, 'EMS', 'EMS', 8, NULL, NULL, 0);
INSERT INTO `shipper` VALUES (9, '天天快递', 'HHTT', 9, NULL, NULL, 0);
INSERT INTO `shipper` VALUES (10, '京东物流', 'JD', 10, NULL, NULL, 0);
INSERT INTO `shipper` VALUES (11, '全峰快递', 'QFKD', 11, NULL, NULL, 0);
INSERT INTO `shipper` VALUES (12, '国通快递', 'GTO', 12, NULL, NULL, 0);
INSERT INTO `shipper` VALUES (13, '优速快递', 'UC', 13, NULL, NULL, 0);
INSERT INTO `shipper` VALUES (14, '德邦快递', 'DBL', 14, NULL, NULL, 0);
INSERT INTO `shipper` VALUES (15, '顺丰特惠', 'SF', 15, '5800279123', NULL, 1);
COMMIT;
