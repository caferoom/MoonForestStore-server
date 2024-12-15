-- ----------------------------
-- Table structure for orderItem
-- ----------------------------
DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item` (
  `id` bigint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键, 订单项表',
  `order_id` bigint(11) unsigned NOT NULL COMMENT '订单ID, 关联订单表',
  `product_id` bigint(11) unsigned NOT NULL COMMENT '商品ID, 关联商品表',
  `sku_id` bigint(11) unsigned NOT NULL COMMENT 'SKU ID, 关联sku表',

  `number` smallint(3) unsigned NOT NULL default 1 COMMENT 'SKU ID, 商品数量',
  `unit_price` decimal(10,2) unsigned NOT NULL COMMENT '商品单价',
  `create_at` bigint(13) unsigned NOT NULL COMMENT '订单创建时间',
  `update_at` bigint(13) unsigned NOT NULL COMMENT '订单更新时间',
  `is_delete` tinyint(3) unsigned NOT NULL DEFAULT 0 COMMENT '是否删除',

  PRIMARY KEY (`id`) USING BTREE,
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  KEY `sku_id` (`sku_id`),
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
