console.log("=== preload.js 开始加载 ===");
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  writeFile: (fileName, content) => ipcRenderer.invoke('write-file', fileName, content),
  openFileDialog: (filters, properties) => ipcRenderer.invoke('open-file-dialog', filters, properties),
  copyFile: (sourcePath, destPath) => ipcRenderer.invoke('copy-file', sourcePath, destPath),
  copyFiles: (sourcePath, destPath) => ipcRenderer.invoke('copy-files', sourcePath, destPath),
  createFile: (fileName, jsonContent) => ipcRenderer.invoke('create-file', fileName, jsonContent),
  readFile: (filePath) => ipcRenderer.invoke('get-file', filePath),
  readFolder: (folderPath) => ipcRenderer.invoke('get-folder', folderPath),
  loadSingleSprite: (relativePath) => ipcRenderer.invoke(`load-single-image`, relativePath),
  selectAtlasFolder: () => ipcRenderer.invoke('select-atlas-folder'),
  saveEditorMapJson: (jsonContent) => ipcRenderer.invoke('save-editor-map-json', jsonContent),
  readEditorMapJson: () => ipcRenderer.invoke('read-editor-map-json'),
  loadAreaImages: (areaName) => ipcRenderer.invoke('load-area-images', areaName),
  excelToJson: (excelPath, jsonPath) => ipcRenderer.invoke('excelToJson', excelPath, jsonPath),
  jsonToExcel: (jsonPath, excelPath) => ipcRenderer.invoke('jsonToExcel', jsonPath, excelPath),
});