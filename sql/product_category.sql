
-- ----------------------------
-- Table structure for product_category
-- ----------------------------
DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `parent_id` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '父分类id',
  `level` tinyint(3) unsigned NOT NULL DEFAULT 1 COMMENT '层级: 1、2、3... ',
  `sort_order` tinyint(3) unsigned NOT NULL DEFAULT '50' COMMENT '排序权重',
  `enabled` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否于前台显示该分类',
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '分类描述图',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `parent_id` (`parent_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1036009 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of product_category
-- ----------------------------
BEGIN;
INSERT INTO `product_category` VALUES (1005000, '居家', 0, 1, 1, 1, 'http://nos.netease.com/yanxuan/f0d0e1a542e2095861b42bf789d948ce.jpg');
INSERT INTO `product_category` VALUES (1005001, '餐厨', 0, 1, 2, 1, 'http://nos.netease.com/yanxuan/88855173a0cfcfd889ee6394a3259c4f.jpg');
INSERT INTO `product_category` VALUES (1005002, '饮食', 0, 1, 9, 0, 'http://nos.netease.com/yanxuan/9a29ef4f41c305a12e1459f12abd290f.jpg');
INSERT INTO `product_category` VALUES (1008000, '配件', 0, 1, 3, 1, 'http://nos.netease.com/yanxuan/935f1ab7dcfeb4bbd4a5da9935161aaf.jpg');
INSERT INTO `product_category` VALUES (1010000, '服装', 0, 1, 6, 0, 'http://nos.netease.com/yanxuan/135113d6a43536b717063413fa24d69a.jpg');
INSERT INTO `product_category` VALUES (1011000, '婴童', 0, 1, 8, 0, 'http://nos.netease.com/yanxuan/8ab3c73fe90951a942e8b06d848f8743.jpg');
INSERT INTO `product_category` VALUES (1012000, '杂货', 0, 1, 4, 1, 'http://nos.netease.com/yanxuan/a0c91ae573079830743dec6ee08f5841.jpg');
INSERT INTO `product_category` VALUES (1013001, '洗护', 0, 1, 7, 0, 'http://nos.netease.com/yanxuan/14bb4a29498a0f93a1ea001f26fea1dd.jpg');
INSERT INTO `product_category` VALUES (1019000, '志趣', 0, 1, 5, 1, 'http://nos.netease.com/yanxuan/72de912b6350b33ecf88a27498840e62.jpg');
INSERT INTO `product_category` VALUES (1019001, '沙发', 1005000, 2, 1, 1, 'http://nos.netease.com/yanxuan/f0d0e1a542e2095861b42bf789d948ce.jpg');
INSERT INTO `product_category` VALUES (1019002, '椅子', 1005000, 2, 1, 1, 'http://nos.netease.com/yanxuan/f0d0e1a542e2095861b42bf789d948ce.jpg');

COMMIT;
