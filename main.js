const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const request = require('superagent')
const fs = require('fs')
const admZip = require('adm-zip')


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
request.get('https://github.com/Blitzhaxx/scanercamo/archive/refs/heads/main.zip')
.on('error',function(error) {
  console.log(error)
}).pipe(fs.createWriteStream('modfolder.zip')).on('finish',function(){
console.log('finished download');
const zip = new admZip('modfolder.zip');
console.log('start unzip');
zip.extractAllTo('./downloaded/',true)
console.log('finished unzip');
fs.unlink('modfolder.zip', (err)=>{if (err) console.error(err)});
console.log('zip deleted');
})


//ipcMain.on('notify', (_,message)=>{})
app.whenReady().then(createWindow);
