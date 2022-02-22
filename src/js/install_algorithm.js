const request = require("superagent");
const fs = require("fs");
const admZip = require("adm-zip");
const path = require("path");
const main = require('../../main');

const downloadpath = "C:/Users/jarno/OneDrive/Bureaublad/files/atest/"

const install = async (url,cpath)=>{
    //console.log('start')
    request.get(`${url}`)
.on('error', function (error) {
  console.log(error);
}).pipe(fs.createWriteStream(downloadpath+'download.zip')).on('finish', function () {
    //console.log('stop')
  const zip = new admZip(downloadpath+'download.zip');
  zip.extractAllTo('./downloaded/', true);
  fs.unlink(downloadpath+'download.zip', (err) => {
    if (err)
      console.error(err);
  });
     recursivefolderfinder(cpath);
     
})
const recursivefolderfinder = async (ipath) => {
  fs.readdirSync(ipath).forEach((file) => {
    const newpath = path.join(ipath,file)
    if (file.includes('.') && file.substring(file.length-4) === 'dvpl') {
       console.log(newpath)
    } else {
      recursivefolderfinder(newpath)
      return 2
    }
  });
};

}



  module.exports =  {
    install
}