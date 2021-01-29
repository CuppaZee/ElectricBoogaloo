const fs = require("fs-extra");
const path = require("path");
// fs.rmdirSync(path.resolve(__dirname, process.argv[3]));
try {
fs.copySync(path.resolve(__dirname, process.argv[2]), path.resolve(__dirname, process.argv[3]), {
  overwrite: true,
  errorOnExist: false,
});
} catch(e){}