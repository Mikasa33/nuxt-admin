/*
 Navicat Premium Data Transfer

 Source Server         : nuxt_admin_dev
 Source Server Type    : MySQL
 Source Server Version : 80036
 Source Host           : 152.136.49.209:3306
 Source Schema         : nuxt_admin_dev

 Target Server Type    : MySQL
 Target Server Version : 80036
 File Encoding         : 65001

 Date: 28/09/2025 09:01:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for __drizzle_migrations
-- ----------------------------
DROP TABLE IF EXISTS `__drizzle_migrations`;
CREATE TABLE `__drizzle_migrations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `hash` text NOT NULL,
  `created_at` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of __drizzle_migrations
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for data_dict
-- ----------------------------
DROP TABLE IF EXISTS `data_dict`;
CREATE TABLE `data_dict` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  `type_id` int NOT NULL,
  `slug` varchar(32) NOT NULL,
  `name` varchar(32) NOT NULL,
  `order_num` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of data_dict
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for data_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `data_dict_type`;
CREATE TABLE `data_dict_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  `parent_id` int DEFAULT NULL,
  `slug` varchar(32) NOT NULL,
  `name` varchar(32) NOT NULL,
  `order_num` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of data_dict_type
-- ----------------------------
BEGIN;
INSERT INTO `data_dict_type` (`id`, `created_at`, `updated_at`, `parent_id`, `slug`, `name`, `order_num`) VALUES (5, '2025-09-18 10:05:02', '2025-09-18 10:05:02', NULL, 'default', '默认', 0);
INSERT INTO `data_dict_type` (`id`, `created_at`, `updated_at`, `parent_id`, `slug`, `name`, `order_num`) VALUES (6, '2025-09-18 10:06:52', '2025-09-18 10:06:52', NULL, 'default2', '默认2', 0);
COMMIT;

-- ----------------------------
-- Table structure for data_file
-- ----------------------------
DROP TABLE IF EXISTS `data_file`;
CREATE TABLE `data_file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  `catalog_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `file_size` bigint NOT NULL,
  `file_mime` varchar(128) DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(512) NOT NULL,
  `url` varchar(512) NOT NULL,
  `file_id` varchar(64) NOT NULL,
  `file_ext` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of data_file
-- ----------------------------
BEGIN;
INSERT INTO `data_file` (`id`, `created_at`, `updated_at`, `catalog_id`, `name`, `file_size`, `file_mime`, `file_name`, `file_path`, `url`, `file_id`, `file_ext`) VALUES (6, '2025-09-18 10:22:10', '2025-09-18 10:22:10', 2, '生成校园场景 (5).png', 4263109, 'image/png', '20250918102210_PfeCnxMKy0CZG8I0EdhyT.png', '/api/data/file/view?name=20250918102210_PfeCnxMKy0CZG8I0EdhyT.png', 'http://localhost:3000/api/data/file/view?name=20250918102210_PfeCnxMKy0CZG8I0EdhyT.png', 'PfeCnxMKy0CZG8I0EdhyT', 'png');
INSERT INTO `data_file` (`id`, `created_at`, `updated_at`, `catalog_id`, `name`, `file_size`, `file_mime`, `file_name`, `file_path`, `url`, `file_id`, `file_ext`) VALUES (7, '2025-09-18 10:30:48', '2025-09-18 10:30:48', 2, '[功能模块] 功能列表.docx', 6413, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '20250918103048_MAFfL-9Oh5m1tHFCiMYES.docx', '/api/data/file/view?name=20250918103048_MAFfL-9Oh5m1tHFCiMYES.docx', 'http://localhost:3000/api/data/file/view?name=20250918103048_MAFfL-9Oh5m1tHFCiMYES.docx', 'MAFfL-9Oh5m1tHFCiMYES', 'docx');
INSERT INTO `data_file` (`id`, `created_at`, `updated_at`, `catalog_id`, `name`, `file_size`, `file_mime`, `file_name`, `file_path`, `url`, `file_id`, `file_ext`) VALUES (8, '2025-09-18 10:47:16', '2025-09-18 10:47:16', 2, '6.webp', 175142, 'image/webp', '20250918104715_dA4y0F60NgAvjMjtuYybP.webp', '/api/data/file/view?name=20250918104715_dA4y0F60NgAvjMjtuYybP.webp', 'http://localhost:3000/api/data/file/view?name=20250918104715_dA4y0F60NgAvjMjtuYybP.webp', 'dA4y0F60NgAvjMjtuYybP', 'webp');
INSERT INTO `data_file` (`id`, `created_at`, `updated_at`, `catalog_id`, `name`, `file_size`, `file_mime`, `file_name`, `file_path`, `url`, `file_id`, `file_ext`) VALUES (9, '2025-09-18 10:47:49', '2025-09-18 10:47:49', 2, '81d46e874fe34402b19dc03243ece349.pdf', 376158, 'application/pdf', '20250918104749__z94A0awoKKTtOBb5lvHO.pdf', '/api/data/file/view?name=20250918104749__z94A0awoKKTtOBb5lvHO.pdf', 'http://localhost:3000/api/data/file/view?name=20250918104749__z94A0awoKKTtOBb5lvHO.pdf', '_z94A0awoKKTtOBb5lvHO', 'pdf');
COMMIT;

-- ----------------------------
-- Table structure for data_file_catalog
-- ----------------------------
DROP TABLE IF EXISTS `data_file_catalog`;
CREATE TABLE `data_file_catalog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  `parent_id` int DEFAULT NULL,
  `name` varchar(32) NOT NULL,
  `order_num` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of data_file_catalog
-- ----------------------------
BEGIN;
INSERT INTO `data_file_catalog` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `order_num`) VALUES (2, '2025-02-20 13:00:41', '2025-02-20 05:00:41', NULL, '测试', 0);
INSERT INTO `data_file_catalog` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `order_num`) VALUES (3, '2025-09-18 10:08:57', '2025-09-18 10:08:57', 2, '测试-1', 0);
COMMIT;

-- ----------------------------
-- Table structure for system_department
-- ----------------------------
DROP TABLE IF EXISTS `system_department`;
CREATE TABLE `system_department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  `parent_id` int DEFAULT NULL,
  `name` varchar(64) NOT NULL,
  `order_num` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of system_department
-- ----------------------------
BEGIN;
INSERT INTO `system_department` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `order_num`) VALUES (1, '2025-02-17 22:54:59', '2025-02-18 09:53:03', NULL, '默认部门', 0);
INSERT INTO `system_department` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `order_num`) VALUES (2, '2025-09-24 09:32:12', '2025-09-24 09:32:12', 1, '111', 0);
COMMIT;

-- ----------------------------
-- Table structure for system_log
-- ----------------------------
DROP TABLE IF EXISTS `system_log`;
CREATE TABLE `system_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT (now()),
  `user_id` int DEFAULT NULL,
  `nickname` varchar(32) DEFAULT NULL,
  `method` varchar(10) NOT NULL,
  `router` varchar(255) NOT NULL,
  `query` json DEFAULT NULL,
  `body` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17047 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for system_menu
-- ----------------------------
DROP TABLE IF EXISTS `system_menu`;
CREATE TABLE `system_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  `parent_id` int DEFAULT NULL,
  `name` varchar(32) NOT NULL,
  `type` enum('catalog','menu','permission') DEFAULT 'menu',
  `slug` varchar(255) DEFAULT NULL,
  `icon` varchar(64) DEFAULT NULL,
  `router` varchar(255) DEFAULT NULL,
  `order_num` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of system_menu
-- ----------------------------
BEGIN;
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (1, '2025-02-18 00:14:48', '2025-02-18 00:14:48', NULL, '首页', 'menu', '', 'i-icon-park-outline-home', '/', 1);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (3, '2025-02-18 00:14:48', '2025-09-18 07:40:45', NULL, '数据管理', 'catalog', '', 'i-icon-park-outline-data', NULL, 998);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (4, '2025-02-18 00:14:48', '2025-09-18 07:40:48', NULL, '系统管理', 'catalog', '', 'i-icon-park-outline-setting-one', NULL, 999);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (5, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 4, '用户管理', 'menu', '', 'i-icon-park-outline-peoples', '/system/user', 1);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (6, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 4, '菜单管理', 'menu', '', 'i-icon-park-outline-mindmap-list', '/system/menu', 2);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (7, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 4, '角色管理', 'menu', '', 'i-icon-park-outline-permissions', '/system/role', 3);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (8, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 3, '字典管理', 'menu', '', 'i-icon-park-outline-notebook-one', '/data/dict', 1);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (9, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 3, '文件管理', 'menu', '', 'i-icon-park-outline-file-cabinet', '/data/file', 2);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (10, '2025-02-18 00:14:48', '2025-09-05 07:44:13', 4, '日志管理', 'menu', '', 'i-icon-park-outline-log', '/system/log', 4);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (11, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '新增', 'permission', 'system:user:add', NULL, NULL, 1);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (12, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '删除', 'permission', 'system:user:delete', NULL, NULL, 2);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (13, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '修改', 'permission', 'system:user:update', NULL, NULL, 3);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (14, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '查询', 'permission', 'system:user:info, system:user:list, system:user:page', NULL, NULL, 4);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (15, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '修改密码', 'permission', 'system:user:changePassword', NULL, NULL, 5);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (16, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '新增部门', 'permission', 'system:department:add', NULL, NULL, 6);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (17, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '删除部门', 'permission', 'system:department:delete', NULL, NULL, 7);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (18, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '修改部门', 'permission', 'system:department:update', NULL, NULL, 8);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (19, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '查询部门', 'permission', 'system:department:info, system:department:list, system:department:page', NULL, NULL, 9);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (20, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 6, '新增', 'permission', 'system:menu:add', NULL, NULL, 1);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (21, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 6, '删除', 'permission', 'system:menu:delete', NULL, NULL, 2);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (22, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 6, '修改', 'permission', 'system:menu:update', NULL, NULL, 3);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (23, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 6, '查询', 'permission', 'system:menu:info, system:menu:list, system:menu:page', NULL, NULL, 4);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (24, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 7, '新增', 'permission', 'system:role:add', NULL, NULL, 1);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (25, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 7, '删除', 'permission', 'system:role:delete', NULL, NULL, 2);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (26, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 7, '修改', 'permission', 'system:role:update', NULL, NULL, 3);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (27, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 7, '查询', 'permission', 'system:role:info, system:role:list, system:role:page', NULL, NULL, 4);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (28, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '新增字典类型', 'permission', 'data:dictType:add', NULL, NULL, 1);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (29, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '删除字典类型', 'permission', 'data:dictType:delete', NULL, NULL, 2);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (30, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '修改字典类型', 'permission', 'data:dictType:update', NULL, NULL, 3);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (31, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '查询字典类型', 'permission', 'data:dictType:info,data:dictType:list,data:dictType:page', NULL, NULL, 4);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (32, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '新增字典', 'permission', 'data:dict:add', NULL, NULL, 5);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (33, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '删除字典', 'permission', 'data:dict:delete', NULL, NULL, 6);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (34, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '修改字典', 'permission', 'data:dict:update', NULL, NULL, 7);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (35, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '查询字典', 'permission', 'data:dict:info,data:dict:list,data:dict:page', NULL, NULL, 8);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (36, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '新增文件目录', 'permission', 'data:fileCatalog:add', NULL, NULL, 1);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (37, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '删除文件目录', 'permission', 'data:fileCatalog:delete', NULL, NULL, 2);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (38, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '修改文件目录', 'permission', 'data:fileCatalog:update', NULL, NULL, 3);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (39, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '查询文件目录', 'permission', 'data:fileCatalog:info,data:fileCatalog:list,data:fileCatalog:page', NULL, NULL, 4);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (40, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '上传文件', 'permission', 'data:file:upload', NULL, NULL, 5);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (41, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '删除文件', 'permission', 'data:file:delete', NULL, NULL, 6);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (42, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '查询文件', 'permission', 'data:file:info,data:file:list,data:file:page', NULL, NULL, 7);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (43, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 10, '查询', 'permission', 'system:log:page', NULL, NULL, 1);
INSERT INTO `system_menu` (`id`, `created_at`, `updated_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_num`) VALUES (44, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 10, '清空', 'permission', 'system:log:clear', NULL, NULL, 2);
COMMIT;

-- ----------------------------
-- Table structure for system_role
-- ----------------------------
DROP TABLE IF EXISTS `system_role`;
CREATE TABLE `system_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  `slug` varchar(32) NOT NULL,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of system_role
-- ----------------------------
BEGIN;
INSERT INTO `system_role` (`id`, `created_at`, `updated_at`, `slug`, `name`) VALUES (1, '2025-09-05 15:51:46', '2025-09-18 07:23:43', 'admin', '管理员');
COMMIT;

-- ----------------------------
-- Table structure for system_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `system_role_menu`;
CREATE TABLE `system_role_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  `role_id` int NOT NULL,
  `menu_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of system_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (139, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 1);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (140, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 9);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (141, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 36);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (142, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 37);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (143, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 38);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (144, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 39);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (145, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 40);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (146, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 41);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (147, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 42);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (148, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 4);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (149, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 5);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (150, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 11);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (151, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 12);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (152, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 13);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (153, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 14);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (154, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 15);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (155, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 16);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (156, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 17);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (157, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 18);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (158, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 19);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (159, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 6);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (160, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 20);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (161, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 21);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (162, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 22);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (163, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 23);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (164, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 7);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (165, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 24);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (166, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 25);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (167, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 26);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (168, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 27);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (169, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 10);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (170, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 43);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (171, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 44);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (172, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 3);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (173, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 8);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (174, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 28);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (175, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 29);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (176, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 30);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (177, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 31);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (178, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 32);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (179, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 33);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (180, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 34);
INSERT INTO `system_role_menu` (`id`, `created_at`, `updated_at`, `role_id`, `menu_id`) VALUES (181, '2025-09-18 15:23:42', '2025-09-18 15:23:42', 1, 35);
COMMIT;

-- ----------------------------
-- Table structure for system_user
-- ----------------------------
DROP TABLE IF EXISTS `system_user`;
CREATE TABLE `system_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  `department_id` int DEFAULT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(32) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of system_user
-- ----------------------------
BEGIN;
INSERT INTO `system_user` (`id`, `created_at`, `updated_at`, `department_id`, `username`, `password`, `nickname`, `phone`) VALUES (1, '2025-02-17 22:54:32', '2025-09-05 06:01:18', 1, 'root', '$scrypt$n=16384,r=8,p=1$1Z/iDgZmesI8Q2VcUKNTGg$Pz5kn/LnnhFkmaxvz+o5NMvBnpuIeAJjGyBk87D9gkdg7JG6V1ByennvBiciQDYorkVlddwoMxORBQLyD25UYg', '超级管理员', NULL);
INSERT INTO `system_user` (`id`, `created_at`, `updated_at`, `department_id`, `username`, `password`, `nickname`, `phone`) VALUES (2, '2025-02-28 16:08:16', '2025-02-28 16:08:16', 1, 'admin', '$scrypt$n=16384,r=8,p=1$fPJnzIAKxsQpX/IZ+brntw$xMtSCX9wXKtLbCKgtkL9vhLSnyWJUfnQw7OAN2lFo4hpDeLbsV+oMFYlHEp9qGnqnvqSUWv+NY7XBdMPPcY4GQ', '管理员', NULL);
INSERT INTO `system_user` (`id`, `created_at`, `updated_at`, `department_id`, `username`, `password`, `nickname`, `phone`) VALUES (3, '2025-02-28 16:09:13', '2025-02-28 16:09:13', 1, 'user', '$scrypt$n=16384,r=8,p=1$E9QpCBT1HEEW1vgUjUCKwA$Vtjl/XuNqZO0JY6ukOpeQ8P/ULgM7KccUOrDxEGB+ZPyA2HgG6vc1jKVbLs2lm176Qox6sEDwYH5CXPLgidXCg', '普通用户', NULL);
COMMIT;

-- ----------------------------
-- Table structure for system_user_role
-- ----------------------------
DROP TABLE IF EXISTS `system_user_role`;
CREATE TABLE `system_user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of system_user_role
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
