const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const algo = require('./src/js/install_algorithm')

let mainWindow;
const isDev = !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
} /*
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}*/

const url =
  "https://github.com/Blitzhaxx/scanercamo/archive/refs/heads/main.zip";
const mod_name = "scanercamo";
const cpath = path.join(__dirname, "downloaded", `${mod_name}-main`);

ipcMain.on("install", async () => {
  
const an = await algo.install(url,cpath)

const wait = ()=>{
  if (an)
  mainWindow.webContents.send('cabt')
  else {
  console.log('again')
  setTimeout(wait,1500)
  }
}
wait()
});



app.whenReady().then(createWindow);