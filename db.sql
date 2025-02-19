-- ----------------------------
-- Records of system_department
-- ----------------------------
BEGIN;
INSERT INTO `system_department` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `order_by`) VALUES (1, '2025-02-17 22:54:59', '2025-02-18 09:53:03', NULL, '默认部门', 0);
COMMIT;

-- ----------------------------
-- Records of system_menu
-- ----------------------------
BEGIN;
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (1, '2025-02-18 00:14:48', '2025-02-18 00:14:48', NULL, '首页', 'menu', '', 'i-icon-park-outline-home', '/', 1);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (2, '2025-02-18 00:14:48', '2025-02-18 00:14:48', NULL, '权限管理', 'catalog', '', 'i-icon-park-outline-permissions', NULL, 2);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (3, '2025-02-18 00:14:48', '2025-02-18 00:14:48', NULL, '数据管理', 'catalog', '', 'i-icon-park-outline-data', NULL, 3);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (4, '2025-02-18 00:14:48', '2025-02-18 00:14:48', NULL, '系统管理', 'catalog', NULL, 'i-icon-park-outline-setting-one', NULL, 4);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (5, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 2, '用户管理', 'menu', '', 'i-icon-park-outline-peoples', '/permission/user', 1);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (6, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 2, '菜单管理', 'menu', '', 'i-icon-park-outline-mindmap-list', '/permission/menu', 2);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (7, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 2, '角色管理', 'menu', '', 'i-icon-park-outline-permissions', '/permission/role', 3);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (8, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 3, '字典管理', 'menu', '', 'i-icon-park-outline-notebook-one', '/data/dict', 1);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (9, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 3, '文件管理', 'menu', '', 'i-icon-park-outline-file-cabinet', '/data/file', 2);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (10, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 4, '日志管理', 'menu', '', 'i-icon-park-outline-log', '/system/log', 1);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (11, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '新增', 'permission', 'permission:user:add', NULL, NULL, 1);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (12, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '删除', 'permission', 'permission:user:delete', NULL, NULL, 2);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (13, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '修改', 'permission', 'permission:user:update', NULL, NULL, 3);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (14, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '查询', 'permission', 'permission:user:info,permission:user:list,permission:user:page', NULL, NULL, 4);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (15, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '修改密码', 'permission', 'permission:user:changePassword', NULL, NULL, 5);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (16, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '新增部门', 'permission', 'permission:department:add', NULL, NULL, 6);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (17, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '删除部门', 'permission', 'permission:department:delete', NULL, NULL, 7);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (18, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '修改部门', 'permission', 'permission:department:update', NULL, NULL, 8);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (19, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 5, '查询部门', 'permission', 'permission:department:info,permission:department:list,permission:department:page', NULL, NULL, 9);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (20, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 6, '新增', 'permission', 'permission:menu:add', NULL, NULL, 1);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (21, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 6, '删除', 'permission', 'permission:menu:delete', NULL, NULL, 2);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (22, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 6, '修改', 'permission', 'permission:menu:update', NULL, NULL, 3);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (23, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 6, '查询', 'permission', 'permission:menu:info,permission:menu:list,permission:menu:page', NULL, NULL, 4);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (24, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 7, '新增', 'permission', 'permission:role:add', NULL, NULL, 1);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (25, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 7, '删除', 'permission', 'permission:role:delete', NULL, NULL, 2);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (26, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 7, '修改', 'permission', 'permission:role:update', NULL, NULL, 3);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (27, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 7, '查询', 'permission', 'permission:role:info,permission:role:list,permission:role:page', NULL, NULL, 4);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (28, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '新增字典类型', 'permission', 'data:dictType:add', NULL, NULL, 1);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (29, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '删除字典类型', 'permission', 'data:dictType:delete', NULL, NULL, 2);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (30, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '修改字典类型', 'permission', 'data:dictType:update', NULL, NULL, 3);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (31, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '查询字典类型', 'permission', 'data:dictType:info,data:dictType:list,data:dictType:page', NULL, NULL, 4);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (32, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '新增字典', 'permission', 'data:dict:add', NULL, NULL, 5);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (33, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '删除字典', 'permission', 'data:dict:delete', NULL, NULL, 6);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (34, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '修改字典', 'permission', 'data:dict:update', NULL, NULL, 7);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (35, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 8, '查询字典', 'permission', 'data:dict:info,data:dict:list,data:dict:page', NULL, NULL, 8);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (36, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '新增文件目录', 'permission', 'data:fileCatalog:add', NULL, NULL, 1);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (37, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '删除文件目录', 'permission', 'data:fileCatalog:delete', NULL, NULL, 2);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (38, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '修改文件目录', 'permission', 'data:fileCatalog:update', NULL, NULL, 3);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (39, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '查询文件目录', 'permission', 'data:fileCatalog:info,data:fileCatalog:list,data:fileCatalog:page', NULL, NULL, 4);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (40, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '上传文件', 'permission', 'data:file:upload', NULL, NULL, 5);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (41, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '删除文件', 'permission', 'data:file:delete', NULL, NULL, 6);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (42, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 9, '查询文件', 'permission', 'data:file:info,data:file:list,data:file:page', NULL, NULL, 7);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (43, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 10, '查询', 'permission', 'system:log:page', NULL, NULL, 1);
INSERT INTO `system_menu` (`id`, `created_at`, `update_at`, `parent_id`, `name`, `type`, `slug`, `icon`, `router`, `order_by`) VALUES (44, '2025-02-18 00:14:48', '2025-02-18 00:14:48', 10, '清空', 'permission', 'system:log:clear', NULL, NULL, 2);
COMMIT;


-- ----------------------------
-- Records of system_user
-- ----------------------------
BEGIN;
INSERT INTO `system_user` (`id`, `created_at`, `update_at`, `department_id`, `username`, `password`, `nickname`, `phone`) VALUES (1, '2025-02-17 22:54:32', '2025-02-18 06:16:12', 1, 'admin', '$scrypt$n=16384,r=8,p=1$1Z/iDgZmesI8Q2VcUKNTGg$Pz5kn/LnnhFkmaxvz+o5NMvBnpuIeAJjGyBk87D9gkdg7JG6V1ByennvBiciQDYorkVlddwoMxORBQLyD25UYg', '管理员', NULL);
COMMIT;
