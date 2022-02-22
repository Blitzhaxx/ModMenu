const request = require("superagent");
const fs = require("fs");
const admZip = require("adm-zip");
const path = require("path");


const install = async (url,cpath)=>{
    //console.log('start')
    request.get(`${url}`)
.on('error', function (error) {
  console.log(error);
}).pipe(fs.createWriteStream('download.zip')).on('finish', function () {
    //console.log('stop')
  const zip = new admZip('download.zip');
  zip.extractAllTo('./downloaded/', true);
  fs.unlink('download.zip', (err) => {
    if (err)
      console.error(err);
  });
    recursivefolderfinder(cpath);
})

}

const recursivefolderfinder = (ipath) => {
    fs.readdirSync(ipath).forEach((file) => {
      const newpath = path.join(ipath,file)
      if (file.includes('.')) {
          if (file.substring(file.length-4).length < 5)
            console.log(newpath)
      } else {
        recursivefolderfinder(newpath)
      }
    });
  };

  module.exports =  {
    install
}