  
-- ----------------------------
-- Table structure for product_spec
-- ----------------------------
DROP TABLE IF EXISTS `product_spec`;
CREATE TABLE `product_spec` (
  `id` BIGINT(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键, 唯一标识规格',
  `product_id` BIGINT unsigned NOT NULL COMMENT '商品Id，关联商品表',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '规格名称，如颜色、尺码等',
  `created_at` bigint(14) UNSIGNED NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `product_id` (`product_id`),
) ENGINE=InnoDB AUTO_INCREMENT=4047 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
