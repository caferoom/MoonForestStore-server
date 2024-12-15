-- ----------------------------
-- Table structure for orderExpress
-- ----------------------------
DROP TABLE IF EXISTS `order_express`;
CREATE TABLE `order_express` (
  `id` bigint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键, 订单物流表id',
  `order_id` bigint(11) unsigned NOT NULL COMMENT '订单ID, 关联订单表',
  `shipper_code` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '快递单号',
  `shipper_company` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '快递公司名称',
  `is_delete` tinyint(3) unsigned NOT NULL DEFAULT 0 COMMENT '是否删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `order_id` (`order_id`),
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
