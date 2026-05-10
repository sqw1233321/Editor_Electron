console.log("=== main.js 开始加载 ===");

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 7000,
        height: 7000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false  // 如果是 true，require 可能不可用
        }
    });
    // 自动打开 DevTools
    win.webContents.openDevTools();
    win.loadFile('build/web-desktop/index.html');
}

// IPC 处理文件写入
ipcMain.handle('write-file', async (event, filePath, content) => {
    const fs = require('fs');
    const fullPath = path.resolve(filePath);
    console.log('尝试写入完整路径:', fullPath);
    try {
        // 确保目录存在
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log('创建目录:', dir);
        }
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log('写入成功:', fullPath);
        return { success: true, path: fullPath };
    } catch (error) {
        console.log('写入失败:', error.message);
        return { success: false, error: error.message };
    }
});
// IPC 处理文件读取
ipcMain.handle('read-file', async (event, filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return { success: true, content };
    } catch (err) {
        return { success: false, error: err.message };
    }
});

app.whenReady().then(createWindow);