console.log("=== preload.js 开始加载 ===");
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  writeFile: (fileName, content) => ipcRenderer.invoke('write-file', fileName, content),
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  createFile: (fileName, jsonContent) => ipcRenderer.invoke('create-file', fileName, jsonContent),
});