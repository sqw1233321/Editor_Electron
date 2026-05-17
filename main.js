console.log("=== main.js 开始加载 ===");

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const COS = require('cos-nodejs-sdk-v5');
const crypto = require('crypto');
require('dotenv').config();

//存储桶信息
//再根目录下创建.env文件，并添加COS_SECRET_ID和COS_SECRET_KEY
const cos = new COS({
    SecretId: process.env.COS_SECRET_ID,
    SecretKey: process.env.COS_SECRET_KEY
});
const COS_BUCKET = 'editor-assets-1433944907';
const COS_REGION = 'ap-chengdu';

//远程资源路径
const remotePrefix = "web-desktop/";
//编辑器包路径
const editorPath = "cocos/web-desktop"

//=============启动流程================
//加载
app.whenReady().then(async () => {
    await hotUpdate();
    createWindow();
});

//热更新
async function hotUpdate() {
    return new Promise((resolve, reject) => {
        cos.getBucket({
            Bucket: COS_BUCKET,
            Region: COS_REGION,
            Prefix: remotePrefix
        }, async function (err, data) {
            if (err) {
                console.error('列出文件失败:', err);
                return resolve({ success: false, error: err.message });
            }

            const files = data.Contents.filter(item => item.Key !== remotePrefix);
            console.log(`找到 ${files.length} 个文件`);
            const localSaveDir = path.join(__dirname, editorPath);

            //比较md5，是否需要热更新
            const needUpdate = isNeedUpdate(data, localSaveDir);
            //===============不需要热更新=========================
            if (!needUpdate) {
                return resolve({ success: true });
            }

            //===========热更新========
            // 安全清理：先删除残留的同名文件，再创建目录
            if (fs.existsSync(localSaveDir)) {
                fs.rmSync(localSaveDir, { recursive: true, force: true });
            }
            fs.mkdirSync(localSaveDir, { recursive: true });

            let successCount = 0;
            let failCount = 0;

            for (const file of files) {
                // 跳过目录条目（COS 返回的文件夹末尾带 /）
                if (file.Key.endsWith('/')) {
                    continue;
                }
                const relativePath = file.Key.replace(remotePrefix, '');
                if (!relativePath) continue; // 空路径跳过
                const localPath = path.join(localSaveDir, relativePath);
                const localSubDir = path.dirname(localPath);

                if (!fs.existsSync(localSubDir)) {
                    fs.mkdirSync(localSubDir, { recursive: true });
                }

                try {
                    await new Promise((res, rej) => {
                        cos.getObject({
                            Bucket: COS_BUCKET,
                            Region: COS_REGION,
                            Key: file.Key,
                            Output: fs.createWriteStream(localPath)
                        }, function (err) {
                            if (err) {
                                rej(err);
                            } else {
                                res();
                            }
                        });
                    });
                    successCount++;
                    console.log(`✓ ${relativePath}`);
                } catch (e) {
                    failCount++;
                    console.log(`✗ ${relativePath} - ${e.message}`);
                }
            }

            resolve({ success: true, total: files.length, downloaded: successCount, failed: failCount });
        });
    });
}

//是否需要热更新
function isNeedUpdate(data, localSaveDir) {
    let needUpdate = true;
    const indexHtmlFile = data.Contents.find(item => item.Key === remotePrefix + 'index.html');
    if (indexHtmlFile) {
        const remoteMd5 = indexHtmlFile.ETag.replace(/"/g, '');
        const localIndexPath = path.join(localSaveDir, 'index.html');
        if (fs.existsSync(localIndexPath)) {
            const localContent = fs.readFileSync(localIndexPath);
            const localMd5 = crypto.createHash('md5').update(localContent).digest('hex');
            if (localMd5 === remoteMd5) {
                console.log('index.html MD5 一致，无需更新');
                needUpdate = false;
                // 可以直接 return resolve({ success: true, updated: false })
                // 或者只跳过 index.html，继续检查其他文件
            } else {
                console.log(`index.html MD5 不一致，本地: ${localMd5}，远程: ${remoteMd5}`);
                needUpdate = true;
            }
        }
    }
    return needUpdate;
}

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
    win.loadFile(`${editorPath}/index.html`);
}


//==================== 文件操作 IPC ====================
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
    const fileName = result.filePaths[0].split("\\").pop();
    console.log("select: ", fileName);
    //修改
    return { success: true, path: fileName };
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
    const baseDir = path.join(__dirname, 'levelBg');
    const areaDir = path.join(baseDir, areaName);
    try {
        if (!fs.existsSync(areaDir)) {
            return { success: false, error: `区域目录不存在: ${areaDir}` };
        }

        let images = [];
        const files = fs.readdirSync(areaDir);
        files.forEach(file => {
            console.log('file', file);
            const fileDir = path.join(areaDir, file);
            const singleImages = [];
            fs.readdirSync(fileDir).forEach(fileName => {
                const fullPath = path.join(fileDir, fileName);  // 完整路径
                console.log('filePath', fullPath);
                const buffer = fs.readFileSync(fullPath);  // 使用完整路径
                const base64 = buffer.toString('base64');
                const ext = fileName.split('.').pop().toLowerCase();
                const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
                singleImages.push({
                    name: fileName,  // 这里是 fileName，没问题
                    data: `data:${mimeType};base64,${base64}`
                });
            });
            images.push(singleImages);
        });
        return { success: true, images };
    } catch (error) {
        return { success: false, error: error.message };
    }
});
