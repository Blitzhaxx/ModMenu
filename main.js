const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { clearScreenDown } = require("readline");

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

//ipcMain.on('notify', (_,message)=>{})
app.whenReady().then(createWindow);
