# 功能更新说明 / Feature Updates

## 更新日期 / Update Date
2025-12-12

## 新增功能 / New Features

### 1. 插件启用/禁用即时切换 / Instant Plugin Enable/Disable Toggle

**功能描述 / Description:**
- 现在可以在设置中直接启用或禁用插件，无需刷新页面即可生效
- 插件会动态注册和注销事件监听器，实现即时切换

**实现细节 / Implementation Details:**
- 添加了 `unregisterEventHandlers()` 函数来移除所有事件监听器
- 修改了 `registerEventHandlers()` 函数，将事件处理器引用存储在 `eventHandlerRefs` 对象中
- 更新了 `handleSettingsChange()` 函数，当启用状态改变时：
  - 启用插件：自动注册事件监听器并添加图片点击处理器
  - 禁用插件：自动注销所有事件监听器
- 显示友好的提示消息（"插件已启用" / "插件已禁用"）

**用户体验改进 / UX Improvements:**
- ✅ 无需刷新页面
- ✅ 即时生效
- ✅ 友好的提示消息

---

### 2. 角色总图库管理 / Character Image Library Management

**功能描述 / Description:**
- 新增"角色总图库"功能，可以查看和管理角色文件夹中的所有图片
- 包括已从聊天中删除但仍存在于磁盘上的图片
- 支持预览和永久删除图片文件，帮助节省云酒馆空间

**实现细节 / Implementation Details:**

#### 新增按钮 / New Button
- 在图库组件头部添加了"打开角色总图库"按钮（文件夹图标）
- 位置：排序按钮左侧

#### 核心功能 / Core Functions

1. **`openCharacterLibrary()`**
   - 获取当前角色名称
   - 扫描角色图片文件夹
   - 显示图库模态窗口

2. **`scanCharacterImageFolder(characterName: string)`**
   - 使用 SillyTavern API (`/api/images/list`) 扫描文件夹
   - 返回所有图片文件列表
   - 路径格式：`/user/images/角色名/`

3. **`showCharacterLibraryModal(characterName, imageFiles)`**
   - 创建全屏模态窗口
   - 显示图片网格（响应式布局）
   - 提供刷新和关闭功能

4. **`createCharacterLibraryImageCard(imageUrl, fileName, index, total)`**
   - 创建单个图片卡片
   - 显示图片索引（如 "1/50"）
   - 悬停时显示删除按钮
   - 点击图片在新标签页预览

5. **`deleteImageFromDisk(imageUrl, fileName)`**
   - 使用 SillyTavern API (`/api/images/delete`) 永久删除文件
   - 需要用户确认
   - 显示成功/失败提示

#### 用户界面 / User Interface
- 响应式网格布局（自动适应屏幕大小）
- 图片卡片：
  - 1:1 宽高比
  - 悬停放大效果
  - 左上角显示索引
  - 右下角显示删除按钮（悬停时可见）
- 模态窗口：
  - 半透明黑色背景
  - 最大宽度 1200px
  - 最大高度 90vh
  - 可滚动内容区域

**用户体验改进 / UX Improvements:**
- ✅ 查看所有历史图片（包括已删除的）
- ✅ 直观的网格布局
- ✅ 一键永久删除
- ✅ 确认对话框防止误删
- ✅ 实时刷新功能
- ✅ 节省云酒馆存储空间

---

## 国际化支持 / Internationalization

### 新增翻译键 / New Translation Keys

#### 中文 (zh-cn.json)
```json
"toast.extensionEnabled": "插件已启用",
"toast.extensionDisabled": "插件已禁用",
"toast.fileDeleted": "文件已永久删除",
"toast.failedToDeleteFile": "删除文件失败",
"toast.scanningImages": "正在扫描图片文件夹...",
"toast.noImagesInFolder": "文件夹中没有图片",
"gallery.characterLibrary": "角色总图库",
"gallery.openCharacterLibrary": "打开角色总图库",
"gallery.characterLibraryTitle": "{characterName} - 总图库",
"gallery.allCharacterImages": "所有图片（包括已删除）",
"gallery.deleteFromDisk": "从磁盘永久删除",
"gallery.confirmDelete": "确定要永久删除这张图片吗？此操作不可恢复！",
"gallery.filesInFolder": "文件夹中的图片：{count} 张",
"gallery.refreshLibrary": "刷新图库",
"gallery.closeLibrary": "关闭图库"
```

#### 英文 (en-us.json)
```json
"toast.extensionEnabled": "Extension enabled",
"toast.extensionDisabled": "Extension disabled",
"toast.fileDeleted": "File permanently deleted",
"toast.failedToDeleteFile": "Failed to delete file",
"toast.scanningImages": "Scanning image folder...",
"toast.noImagesInFolder": "No images found in folder",
"gallery.characterLibrary": "Character Library",
"gallery.openCharacterLibrary": "Open Character Library",
"gallery.characterLibraryTitle": "{characterName} - Library",
"gallery.allCharacterImages": "All Images (including deleted)",
"gallery.deleteFromDisk": "Delete from disk permanently",
"gallery.confirmDelete": "Are you sure you want to permanently delete this image? This action cannot be undone!",
"gallery.filesInFolder": "Images in folder: {count}",
"gallery.refreshLibrary": "Refresh Library",
"gallery.closeLibrary": "Close Library"
```

---

## API 依赖 / API Dependencies

### SillyTavern API 端点 / Endpoints Used

1. **列出图片 / List Images**
   - 端点：`POST /api/images/list`
   - 请求体：`{ folder: "角色名" }`
   - 响应：`{ images: ["file1.png", "file2.jpg", ...] }`

2. **删除图片 / Delete Image**
   - 端点：`POST /api/images/delete`
   - 请求体：`{ folder: "角色名", file: "文件名.png" }`
   - 响应：成功/失败状态

**注意 / Note:** 这些 API 端点需要 SillyTavern 支持。如果您的 SillyTavern 版本不支持这些端点，可能需要更新或使用替代方案。

---

## 文件修改清单 / Modified Files

1. **src/index.ts**
   - 添加 `eventHandlerRefs` 对象存储事件处理器引用
   - 添加 `unregisterEventHandlers()` 函数
   - 修改 `registerEventHandlers()` 函数存储处理器引用
   - 修改 `handleSettingsChange()` 函数实现即时切换

2. **src/gallery_widget.ts**
   - 在 `renderExpandedWidget()` 中添加"角色总图库"按钮
   - 添加 `openCharacterLibrary()` 方法
   - 添加 `scanCharacterImageFolder()` 方法
   - 添加 `showCharacterLibraryModal()` 方法
   - 添加 `createCharacterLibraryImageCard()` 方法
   - 添加 `deleteImageFromDisk()` 方法

3. **i18n/zh-cn.json**
   - 添加 14 个新的翻译键

4. **i18n/en-us.json**
   - 添加 14 个新的翻译键

---

## 使用说明 / Usage Instructions

### 启用/禁用插件 / Enable/Disable Plugin
1. 打开 SillyTavern 设置
2. 找到 "Auto Illustrator" 扩展设置
3. 勾选或取消勾选 "启用自动插画" 复选框
4. 插件会立即生效，无需刷新页面

### 使用角色总图库 / Using Character Library
1. 确保已打开一个角色对话
2. 在图库组件中点击"文件夹"图标按钮
3. 系统会扫描该角色的图片文件夹
4. 在弹出的模态窗口中：
   - 浏览所有图片（网格布局）
   - 点击图片在新标签页预览
   - 悬停在图片上显示删除按钮
   - 点击删除按钮永久删除文件（需确认）
   - 点击刷新按钮重新扫描文件夹
   - 点击关闭按钮或点击背景关闭窗口

---

## 测试建议 / Testing Recommendations

### 功能 1：插件启用/禁用
- [ ] 禁用插件后，新消息不应自动生成图片
- [ ] 启用插件后，新消息应恢复自动生成图片
- [ ] 切换过程中不应出现错误
- [ ] 提示消息应正确显示

### 功能 2：角色总图库
- [ ] 能够正确扫描角色图片文件夹
- [ ] 显示所有图片（包括已从聊天中删除的）
- [ ] 图片预览功能正常
- [ ] 删除功能正常工作
- [ ] 删除后文件确实从磁盘移除
- [ ] 刷新功能正常
- [ ] 模态窗口关闭功能正常
- [ ] 响应式布局在不同屏幕尺寸下正常

---

## 已知限制 / Known Limitations

1. **API 依赖**：角色总图库功能依赖 SillyTavern 的图片管理 API，如果 API 不可用，功能将无法使用。

2. **文件夹路径**：假设图片存储在 `/user/images/角色名/` 路径下，如果您的配置不同，可能需要调整。

3. **删除确认**：删除操作不可撤销，请谨慎使用。

---

## 未来改进建议 / Future Improvements

1. 添加批量删除功能
2. 添加图片搜索/过滤功能
3. 添加图片排序选项（按日期、大小等）
4. 添加图片详细信息显示（文件大小、创建日期等）
5. 支持图片移动到其他文件夹
6. 添加回收站功能（软删除）

---

## 贡献者 / Contributors
- GitHub Copilot (AI Assistant)
- 用户需求提供者

---

## 版本信息 / Version Info
- 插件版本：1.5.0+
- 更新类型：功能增强
- 兼容性：需要 SillyTavern 最新版本
