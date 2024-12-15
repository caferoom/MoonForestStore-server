-- ----------------------------
-- Table structure for product_spec_value
-- ----------------------------
DROP TABLE IF EXISTS `product_spec_value`;
CREATE TABLE `product_spec_value` (
  `id` BIGINT(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键, 唯一标识规格',
  `spec_id` BIGINT unsigned NOT NULL COMMENT '规格键名Id，关联规格键表',
  `value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '规格的键值（如红色、蓝色、M、L）',
  `created_at` bigint(14) UNSIGNED NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `spec_id` (`spec_id`),
) ENGINE=InnoDB AUTO_INCREMENT=4047 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
