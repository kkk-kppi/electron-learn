const information = document.getElementById('info')
console.log('app versions', versions)
information.innerText = `
   全局versions变量为：${versions} \n
   本应用正在使用（基于/应用开发版本）: \n
      Chrome (v${versions.chrome()}) \n
      Node.js (v${versions.node()}) \n
      Electron (v${versions.electron()})
`

const ProcessMessage = document.getElementById('process-message')
// 进程间的通信
const Process = async () => {
   const VersionsPing = await window.versions.ping()
   const IpcRender = await window.VARPROCESS.IpcRender()

   console.log(`
      VersionsPing：${VersionsPing} \n
      IpcRender：${IpcRender}
   `)

   ProcessMessage.innerHTML = `
      VersionsPing：${VersionsPing} \n
      IpcRender：${IpcRender}
   `
}
Process()