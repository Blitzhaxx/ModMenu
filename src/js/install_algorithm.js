const request = require("superagent");
const fs = require("fs");
const admZip = require("adm-zip");
const path = require("path");

let status = false;
let paths = [];

const getStatus = () => {
  return status;
};

const install = async (url,basePath,cpath,mod_name,wotb) => {
  status=false;
  wotbpaths=[]
  paths=[]
  const tempPath = path.join(basePath, "download.zip")
  //console.log('start')
  request
    .get(`${url}`)
    .on("error", function (error) {
      console.log(error);
    })
    .pipe(fs.createWriteStream(tempPath))
    .on("finish", function () {
      //console.log("stop");
      const zip = new admZip(tempPath);
      zip.extractAllTo(basePath, true);
      fs.unlink(tempPath, (err) => {
        if (err) console.error(err);
      });
      recursivefolderfinder(cpath,cpath);
      paths.forEach(async(file,i)=>{
        fs.copyFile(file,wotbpaths[i], (err)=>{if (err) throw err})
      })
      status=true
      
    });
  
  
    const recursivefolderfinder = async (ipath,cpath) => {
    fs.readdirSync(ipath).forEach((file) => {
      const newpath = path.join(ipath, file);
      if (file.substring(file.length - 5) === ".dvpl") {
        paths.push(newpath)
        wotbpaths.push(path.join(wotb,newpath.split(mod_name+'-main')[1]));
      } else {
        recursivefolderfinder(newpath,cpath);
      }
    });
  };
  
};


module.exports = {
  install,
  getStatus,
};
