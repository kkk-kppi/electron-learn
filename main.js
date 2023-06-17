const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

console.log('Hello from Electron 👋')

const createWindow = () => {

   // 将您的页面加载到新的BrowserWindow实例中
   const win = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
         preload: path.join(__dirname, 'preload.js')
      }
   })

   // 加载文件
   win.loadFile('index.html')
}

// 在应用准备就绪时调用函数
app.whenReady().then(() => {
   createWindow()

   // 如果没有窗口打开则打开一个窗口（macOS），即使没有窗口，macOS应用通常也会继续运行
   app.on('activate', () => {
      if(
         BrowserWindow.getAllWindows().length === 0
      ) {
         createWindow()
      }
   })

   // ipcMain暴露一个处理程序
   ipcMain.handle('ping', () => 'pong')
   ipcMain.handle('IpcRender', () => 'IpcRender')
})

// 关闭所有窗口时退出应用（Window & Linux）
app.on('window-all-closed', () => {
   if(process.platform !== 'darwin') app.quit()
})
