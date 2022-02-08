const fs = require('fs');
const glob = require("glob");

function modifyPath(fileName) {
  if (fileName.indexOf(".") == -1) {
    return;
  }
  const filePath = __dirname + "/" + fileName;
  fs.readFile(filePath, 'utf-8', function(err, data){
    if (err) throw err;

    if (data.indexOf('/assets/') !== -1 && data.indexOf('/aghanim-legendary-shards/assets/') == -1) {

      let edited = data.split('/assets/').join('/aghanim-legendary-shards/assets/');

      fs.writeFile(filePath, edited, 'utf-8', function (err) {
        if (err) throw err;
        console.log('\x1b[32m%s\x1b[0m', 'Modified ' + fileName);
      });
    }
  });
}

const getDirectories = function (src, callback) {
  glob(src + '/**/*', callback);
};

getDirectories('dist', function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    res.map(file => {
      modifyPath(file);
    });
  }
});
