  
-- ----------------------------
-- Table structure for product_images
-- ----------------------------
DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images` (
  `id` BIGINT(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键, 唯一标识图片',
  `product_id` BIGINT(5) unsigned NOT NULL COMMENT '商品 ID, 关联商品表',
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '图片URL或存储路径',
  `image_type` tinyint(3) UNSIGNED NOT NULL COMMENT "图片类型。如主图(0)、细节图(1)",
  `sort_order` INT(10) UNSIGNED NOT NULL DEFAULT 100 COMMENT "图片排序（如果有多个图片，可以按排序显示）",
  `created_at` bigint(14) UNSIGNED NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `product_id` (`product_id`),
) ENGINE=InnoDB AUTO_INCREMENT=4047 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
