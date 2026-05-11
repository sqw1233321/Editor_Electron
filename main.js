console.log("=== main.js 开始加载 ===");

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
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
ipcMain.handle('write-file', async (event, fileName, content) => {
    const fs = require('fs');
    const baseDir = path.join(`${__dirname}/mapDat/`, `${fileName}.json`);
    const fullPath = path.resolve(baseDir);
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
    const fileName = path.basename(filePath);

    return { success: true, path: filePath, content, fileName };
});

// 新建文件（渲染进程传入文件名和JSON内容）
ipcMain.handle('create-file', async (event, fileName, jsonContent) => {
    const fs = require('fs');
    // 存放地图数据的目录
    const baseDir = path.join(__dirname, 'mapDat');
    const fullPath = path.join(baseDir, fileName);

    if (fs.existsSync(fullPath)) {
        return { success: false, reason: 'duplicate', path: fullPath };
    }
    return { success: true, path: fullPath };
});

// ==================== 图集相关 IPC ====================

// 打开文件夹选择框，选择图集根目录
ipcMain.handle('select-atlas-folder', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
        title: '选择背景图集文件夹'
    });

    if (result.canceled || !result.filePaths[0]) {
        return { success: false };
    }

    return { success: true, path: result.filePaths[0] };
});

// 读取文件夹下所有子文件夹名称（各个区域）
ipcMain.handle('read-atlas-subfolders', async (event, parentPath) => {
    const fs = require('fs');
    try {
        const entries = fs.readdirSync(parentPath, { withFileTypes: true });
        const subfolders = entries
            .filter(e => e.isDirectory())
            .map(e => e.name)
            .sort();
        return { success: true, subfolders };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// 将图集复制到 Cocos resources 目录，并返回区域列表
ipcMain.handle('import-atlas-to-resources', async (event, sourceFolder) => {
    const fs = require('fs');
    const destDir = path.join(__dirname, 'cocos/NewMapEditor/assets/resources/levelBg');

    try {
        // 确保目标目录存在
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        // 读取源文件夹的子文件夹
        const entries = fs.readdirSync(sourceFolder, { withFileTypes: true });
        const subfolders = entries.filter(e => e.isDirectory());

        const areas = [];

        for (const sub of subfolders) {
            const srcPath = path.join(sourceFolder, sub.name);
            const destPath = path.join(destDir, sub.name);

            fs.mkdirSync(destPath, { recursive: true });

            const files = fs.readdirSync(srcPath);
            const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

            for (const file of imageFiles) {
                fs.copyFileSync(path.join(srcPath, file), path.join(destPath, file));
            }

            areas.push({
                name: sub.name,
                imageCount: imageFiles.length
            });
        }

        console.log('图集导入成功，区域列表:', areas);
        return { success: true, areas };
    } catch (error) {
        console.error('图集导入失败:', error.message);
        return { success: false, error: error.message };
    }
});

// 写入 editorMap.json
ipcMain.handle('save-editor-map-json', async (event, jsonContent) => {
    const fs = require('fs');
    const fullPath = path.join(__dirname, 'editorMap.json');
    try {
        fs.writeFileSync(fullPath, jsonContent, 'utf-8');
        return { success: true, path: fullPath };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// 读取 editorMap.json（渲染进程专用，不弹框）
ipcMain.handle('read-editor-map-json', async () => {
    const fs = require('fs');
    const fullPath = path.join(__dirname, 'editorMap.json');
    try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        return { success: true, content };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// 读取某个区域文件夹下的所有图片，返回 base64 数据
ipcMain.handle('load-area-images', async (event, areaName) => {
    const fs = require('fs');
    const baseDir = path.join(__dirname, 'cocos/NewMapEditor/assets/resources/levelBg');
    const areaDir = path.join(baseDir, areaName);

    try {
        if (!fs.existsSync(areaDir)) {
            return { success: false, error: `区域目录不存在: ${areaDir}` };
        }

        const files = fs.readdirSync(areaDir)
            .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
            .sort();

        const images = files.map(fileName => {
            const filePath = path.join(areaDir, fileName);
            const buffer = fs.readFileSync(filePath);
            const base64 = buffer.toString('base64');
            const ext = fileName.split('.').pop().toLowerCase();
            const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
            return {
                name: fileName,
                data: `data:${mimeType};base64,${base64}`
            };
        });

        return { success: true, images };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

app.whenReady().then(createWindow);