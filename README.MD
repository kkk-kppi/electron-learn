### 1. 什么是预加载脚本
Electron的主进程是一个拥有着完全操作系统访问权限的Node.js环境，在 Electron 模块之上，您还可以访问 Node.js 内置插件，以及通过 npm 安装的任何包。另一方面，出于安全原因，渲染进程默认跑在网页页面上，而并非 Node.js里。

为了将 Electron 的不同类型的进程桥接在一起，我们需要使用被称为 预加载 的特殊脚本。

### 2. 使用预加载脚本来增强渲染器
BrowserWindow 的预加载脚本运行在具有 HTML DOM 和 Node.js、Electron API 的有限子集访问权限的环境中。

从 Electron 20 开始，预加载脚本默认 沙盒化 ，不再拥有完整 Node.js 环境的访问权。 实际上，这意味着你只拥有一个 polyfilled 的 require 函数，这个函数只能访问一组有限的 API。
可用的 API	            详细信息
Electron 模块	         渲染进程模块
Node.js 模块	         events、timers、url
Polyfilled 的全局模块    Buffer、process、clearImmediate、setImmediate

预加载脚本在网页加载到渲染器之前被注入，类似于 Chrome 扩展程序的内容脚本。 要向渲染器添加需要特权访问的功能，您可以通过 contextBridge API 定义全局对象。

### 3. 在进程之间通信
Electron 的主进程和渲染进程有着清楚的分工并且不可互换。 这代表着无论是从渲染进程直接访问 Node.js 接口，亦或者是从主进程访问 HTML 文档对象模型 (DOM)，都是不可能的。

解决以上问题的方法是使用进程间通信（IPC）。可以使用Electron的ipcMain模块和ipcRenderer模块来进行进程间通信。为了从你的网页向主进程发送消息，可以使用ipcMain.handle设置一个主进程处理程序（handler），然后再预处理脚本暴露一个被称为ipcRenderer.invoke的函数来触发该处理程序（handler）

3-摘要
预加载脚本包含在浏览器窗口加载网页之前运行的代码，其可以访问DOM接口和Node.js环境，并且经常在其中使用contextBridge接口将特权接口暴露给渲染器。

由于主进程和渲染进程有着完全不同的分工，Electron 应用通常使用预加载脚本来设置进程间通信 (IPC) 接口以在两种进程之间传输任意信息


### 4. 添加功能
1. 增加应用复杂度
在之前的教程中，我们已经拥有了一个静态用户界面的Electron应用，现在开始，我们可以从两个方向上进行开发
  1. 增加渲染进程的网页应用代码复杂度 Web方式构建渲染器UI
  2. 深化与操作系统的Node.js的集成


### 打包应用程序 使用Electron Forge打包
Electron Forge是一个处理Electron应用程序打包和分发的一体化工具
`
pnpm add --save-dev @electron-forge/cli
npx electron-forge import
`
会安装一些依赖和在package.json中增加packager和make脚本命令
运行make，会检索package.json，字段author和description没有填写时，会抛出错误并进行打包

运行make脚本命令，包含两步：
1. 将会首先运行electron-forge package命令

重要提示：对代码进行签名
代码签名是交付桌面应用程序的重要组成部分，并且它对于应用程序的自动更新功能 (将会在教程最后部分讲解) 来说是必需的
代码签名是一种可用于证明桌面应用程序是由已知来源创建的安全技术。 Windows 和 macOS 拥有其特定的代码签名系统，这将使用户难以下载或启动未签名的应用程序。
在 macOS 上，代码签名是在应用程序打包时完成的。 而在 Windows 中，则是对可分发文件进行签名操作。 如果您已经拥有适用于 Windows 和 macOS 的代码签名证书，可以在 Forge 配置中设置您的凭据。

### 启动程序
`pnpm run start`

### 打包程序
`pnpm run make`

### learn address
1. Electron address: https://www.electronjs.org/zh/docs/latest/
2. Electron resources: https://juejin.cn/book/7152717638173966349