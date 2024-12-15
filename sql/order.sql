-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` bigint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键, 订单表',
  `user_id` int(11) unsigned NOT NULL COMMENT '用户id, 关联用户表',

  `order_sn` varchar(127) NOT NULL COMMENT '订单编号，唯一标识订单, 供用户查看',
  `pay_status` varchar(20) NOT NULL COMMENT '支付状态: paid、refunded、unpaid',
  `payment_method` varchar(20) NOT NULL COMMENT '支付方式: wechat、alipay、credit_card、paypal、offline_support',
  `order_status` varchar(20) NOT NULL COMMENT '订单状态: created、paid、preparing、shipped、received、completed、canceled、returning、returned、exchanging、exchanged',

  `create_at` bigint(13) unsigned NOT NULL COMMENT '订单创建时间',
  `update_at` bigint(13) unsigned NOT NULL COMMENT '订单更新时间',
  `pay_at` bigint(13) unsigned NULL DEFAULT NULL COMMENT '付款时间',

  `total_amount` decimal(10, 2) unsigned NOT NULL COMMENT '总价（改价/优惠前商品价格）+ 运费',
  `shipping_cost` decimal(10, 2) unsigned NOT NULL COMMENT '快递费',
  `pay_amount` decimal(10, 2) unsigned NOT NULL COMMENT '实际支付价格，各种优惠活动|卷使用后价格',

  `recipient_name` varchar(64) NOT NULL COMMENT '收件人姓名',
  `recipient_mobile` varchar(32) NOT NULL COMMENT '收件人电话',
  `province` smallint(5) unsigned NOT NULL COMMENT '收件省份',
  `city` smallint(5) unsigned NOT NULL COMMENT '收件城市',
  `district` smallint(5) unsigned NOT NULL COMMENT '收件区域',
  `address` varchar(255) NOT NULL COMMENT '收件详细地址',

  `note` varchar(255) NOT NULL DEFAULT '' COMMENT '客户备注',
  `is_delete` tinyint(3) unsigned NOT NULL DEFAULT 0 COMMENT '是否删除',

  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`),
  UNIQUE KEY `order_sn` (`order_sn`),
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;