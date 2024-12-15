  
-- ----------------------------
-- Table structure for product_sku
-- ----------------------------
DROP TABLE IF EXISTS `product_sku`;
CREATE TABLE `product_sku` (
  `id` BIGINT(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键, 唯一标识SKU',
  `product_id` BIGINT(5) unsigned NOT NULL COMMENT '商品 ID, 关联商品表',
  `sku_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'SKU 编号(如红色M码)',
  `stock_quantity` INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT "当前库存数量",
  `reserved_quantity` INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT "已预留库存（如未支付订单锁定库存）",
  `retail_price` decimal(10,2) unsigned NOT NULL COMMENT '零售价格',
  `cost_price` decimal(10,2) unsigned NOT NULL COMMENT '成本价',
  `spec_values` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '{}' COMMENT '记录具体规格，类似 {"颜色": "红色", "尺码": "M"} ',             
  `update_at` bigint(14) UNSIGNED NOT NULL COMMENT '最近一次库存更新的时间',
  `create_at` bigint(14) UNSIGNED NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `product_id` (`product_id`),
  UNIQUE KEY `unique_sku_code` (`sku_code`) -- 添加唯一约束
) ENGINE=InnoDB AUTO_INCREMENT=4047 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
