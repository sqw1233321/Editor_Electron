console.log("=== main.js 开始加载 ===");

const { app, BrowserWindow, ipcMain,dialog } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 7000,
        height: 7000,
        // frame: false,          // 隐藏窗口边框和标题栏
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false  // 如果是 true，require 可能不可用
        }
    });
    // 自动打开 DevTools
    win.webContents.openDevTools();
    win.loadFile('cocos/NewMapEditor/build/web-desktop/index.html');
}

//写文件
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

//读取文件
ipcMain.handle('open-file-dialog', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        defaultPath: path.join(__dirname, 'assets/mapDat'),
        filters: [{ name: 'JSON Files', extensions: ['json'] }]
    });
    
    if (result.canceled) {
        return { success: false };
    }
    
    const filePath = result.filePaths[0];
    const fs = require('fs');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    return { success: true, path: filePath, content };
});

app.whenReady().then(createWindow);