# 手机 PWA

## 使用

手机打开：https://Aminoshaha.github.io/advanced-mathematics-calculus-quiz-platform/

Android：点击页面“安装”，或使用浏览器菜单的安装应用/添加到主屏幕。

iPhone：在 Safari 中打开，点分享，再选择“添加到主屏幕”。

首次使用保持联网，等待标题栏显示“离线就绪”。全部题目、解析和原题截图才会完整缓存；之后可以断网重开、刷题和结算。浏览器清理站点数据会删除离线缓存与本机学习记录，建议定期用“记录”菜单备份。

网页版现有极限40题与导数及微分19题，共59题。原Windows v0.2.0分发包仍为极限40题，源码构建版包含最新题库。手机与Windows桌面版分别存储记录，可通过备份JSON转移，暂不提供云端自动同步。

## 布局

按提供的小测截图设计：顶部进度、答题卡；中间题干与 A/B/C/D 选项；作答后显示我的答案、得分、正确答案、知识点与详细解析；底部固定上一题与下一题。

答题卡可回看已答题，已提交答案不可修改。整组延迟模式在整组结束前不会在答题卡泄露正确与否。最后一题仍按既有规则自动结算。

## 离线与更新

- Web App Manifest、192/512px 图标、相对路径作用域支持项目子目录部署。
- Service Worker 在安装时完整缓存运行资源与全部原图。失败不会接管页面。
- 网站更新后，新缓存等待用户点击“更新”再接管；更新前保存练习进度。
- 缓存版本由资源内容计算，发布前需运行 `node web/tools/build-pwa.mjs`。
- 页面只保存本机记录，不上传学习数据。恢复备份前在本机保存恢复前快照。

## 部署

将 `web/` 的内容发布到 GitHub Pages 的 `gh-pages` 分支根目录。Pages 开启 HTTPS。源码仍留在 `main`，Windows v0.2.0 便携版继续独立使用。

PWA 本地预览可用 `python web/serve.py`；localhost 可以测试离线功能。手机直接访问电脑的普通 HTTP 局域网地址时，不具备 PWA 安装和 Service Worker 所需的安全上下文，手机验收应使用已发布的 HTTPS 地址。

参考：[MDN PWA 安装要求](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)。
