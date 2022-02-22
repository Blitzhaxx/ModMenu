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
} 
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

const url =
  "https://github.com/Blitzhaxx/leg_69/archive/refs/heads/main.zip";
const mod_name = "leg_69";
const basePath = "C:/Users/jarno/OneDrive/Bureaublad/files/atest/"
const cpath = path.join("C:/Users/jarno/OneDrive/Bureaublad/files/atest/", `${mod_name}-main`);
const wotb = "C:/Program Files (x86)/Steam/steamapps/common/World of Tanks Blitz - Copy"

ipcMain.on("install", async () => {  
await algo.install(url,basePath,cpath,mod_name,wotb)

const wait = ()=>{
  if (algo.getStatus()){
  mainWindow.webContents.send('cabt')}
  else {
  setTimeout(wait,1500)
  }
}
wait()
});



app.whenReady().then(createWindow);