const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const request = require('superagent')
const fs = require('fs')
const admZip = require('adm-zip')

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
}/*
//download
request.get('https://github.com/Blitzhaxx/scanercamo/archive/refs/heads/main.zip')
.on('error',function(error) {
  console.log(error)
}).pipe(fs.createWriteStream('modfolder.zip')).on('finish',function(){
//unzip
const zip = new admZip('modfolder.zip');
zip.extractAllTo('./downloaded/',true)
//delete zip
fs.unlink('modfolder.zip', (err)=>{if (err) console.error(err)});
console.log('zip deleted');
})*/


ipcMain.on('install',()=>{
  //download
  console.log('start download');
request.get('https://github.com/Blitzhaxx/scanercamo/archive/refs/heads/main.zip')
.on('error', function (error) {
  console.log(error);
}).pipe(fs.createWriteStream('modfolder.zip')).on('finish', function () {
  //unzip
  console.log('unzip')
  const zip = new admZip('modfolder.zip');
  zip.extractAllTo('./downloaded/', true);
  //delete zip
  fs.unlink('modfolder.zip', (err) => {
    if (err)
      console.error(err);
  });
  console.log('zip deleted');
  mainWindow.webContents.send('cabt');
})

})



app.whenReady().then(createWindow);
