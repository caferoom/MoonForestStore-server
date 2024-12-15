-- ----------------------------
-- Table structure for cart_item
-- ----------------------------
DROP TABLE IF EXISTS `cart_item`;
CREATE TABLE `cart_item` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键, 购物车项表',
  `user_id` int(11) UNSIGNED NOT NULL COMMENT '用户id, 关联用户表',
  `sku_id` bigint(11) UNSIGNED NOT NULL COMMENT 'SKU id, 关联商品SKU表',
  `number` smallint(3) UNSIGNED NOT NULL COMMENT '商品数量',
  `create_at` bigint(14) UNSIGNED NOT NULL COMMENT '产品添加到购物车时间',
  `update_at` bigint(14) UNSIGNED NOT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`),
  KEY `sku_id` (`sku_id`),
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of cart_item
-- ----------------------------
BEGIN;

-- 
-- 

COMMIT;
